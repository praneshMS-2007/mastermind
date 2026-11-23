import { AgentId, AgentProfile, AgentTask, TaskResult } from '../../src/types/agentTypes';
import { BaseAgent } from '../agents/baseAgent';
import { CeoAgent } from '../agents/ceoAgent';
import {
  MarketingAgent,
  SalesAgent,
  DevelopmentAgent,
  OperationsAgent,
  HrAgent,
  SupportAgent,
  AnalyticsAgent,
} from '../agents/specializedAgents';

export class ExecutionEngine {
  private static instance: ExecutionEngine;
  private agents: Map<AgentId, BaseAgent> = new Map();

  private constructor() {
    this.registerAgent(new CeoAgent());
    this.registerAgent(new MarketingAgent());
    this.registerAgent(new SalesAgent());
    this.registerAgent(new DevelopmentAgent());
    this.registerAgent(new OperationsAgent());
    this.registerAgent(new HrAgent());
    this.registerAgent(new SupportAgent());
    this.registerAgent(new AnalyticsAgent());
  }

  public static getInstance(): ExecutionEngine {
    if (!ExecutionEngine.instance) {
      ExecutionEngine.instance = new ExecutionEngine();
    }
    return ExecutionEngine.instance;
  }

  public registerAgent(agent: BaseAgent) {
    this.agents.set(agent.id, agent);
  }

  public getAgent(id: AgentId): BaseAgent | undefined {
    return this.agents.get(id);
  }

  public getAllAgents(): BaseAgent[] {
    return Array.from(this.agents.values());
  }

  public getAllAgentProfiles(): AgentProfile[] {
    return Array.from(this.agents.values()).map((agent) => agent.getProfile());
  }

  /**
   * Executes a single task with live event updates.
   */
  public async executeTask(
    task: AgentTask,
    onUpdate?: (updatedTask: AgentTask) => void
  ): Promise<AgentTask> {
    const agent = this.agents.get(task.assigned_agent);
    if (!agent) {
      task.execution_status = 'failed';
      task.error = `Assigned agent "${task.assigned_agent}" is not registered.`;
      task.logs.push({
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        level: 'error',
        message: task.error,
        agentId: task.assigned_agent,
      });
      onUpdate?.({ ...task });
      return task;
    }

    // Strict Human Approval Guard
    if (task.approval_status !== 'approved') {
      task.execution_status = 'pending_approval';
      task.error = 'Execution blocked: Task requires explicit human approval.';
      onUpdate?.({ ...task });
      return task;
    }

    task.execution_status = 'running';
    task.progress = 10;
    task.error = undefined;
    task.logs.push({
      id: `log-${Date.now()}-start`,
      timestamp: new Date().toISOString(),
      level: 'info',
      message: `${agent.name} commenced task execution for "${task.objective}".`,
      agentId: task.assigned_agent,
    });
    onUpdate?.({ ...task });

    try {
      const result: TaskResult = await agent.execute(
        task,
        (progress, logMessage, level = 'info') => {
          task.progress = progress;
          task.logs.push({
            id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            timestamp: new Date().toISOString(),
            level,
            message: logMessage,
            agentId: task.assigned_agent,
          });
          onUpdate?.({ ...task });
        }
      );

      task.result = result;
      task.progress = 100;
      task.execution_status = 'completed';
      task.completed_at = new Date().toISOString();
      task.completed_subtasks = [...task.subtasks];
      task.logs.push({
        id: `log-${Date.now()}-done`,
        timestamp: new Date().toISOString(),
        level: 'success',
        message: `Task successfully completed by ${agent.name}.`,
        agentId: task.assigned_agent,
      });
      onUpdate?.({ ...task });
      return task;
    } catch (err: any) {
      task.execution_status = 'failed';
      task.error = err.message || 'Unknown error occurred during execution.';
      task.logs.push({
        id: `log-${Date.now()}-err`,
        timestamp: new Date().toISOString(),
        level: 'error',
        message: `Execution failed: ${task.error}`,
        agentId: task.assigned_agent,
      });
      onUpdate?.({ ...task });
      return task;
    }
  }

  /**
   * Executes a plan of tasks according to dependency order and approval state.
   */
  public async executePlan(
    tasks: AgentTask[],
    onUpdate?: (updatedTasks: AgentTask[]) => void
  ): Promise<AgentTask[]> {
    const taskMap = new Map<string, AgentTask>();
    tasks.forEach((t) => taskMap.set(t.id, { ...t }));

    // Only process approved tasks
    const executableTasks = Array.from(taskMap.values()).filter(
      (t) => t.approval_status === 'approved' && t.execution_status !== 'completed'
    );

    for (const task of executableTasks) {
      // Verify dependencies
      const hasUnfinishedDependencies = task.dependencies.some((depId) => {
        const dep = taskMap.get(depId);
        return dep && dep.execution_status !== 'completed';
      });

      if (hasUnfinishedDependencies) {
        task.execution_status = 'blocked';
        task.logs.push({
          id: `log-${Date.now()}-blk`,
          timestamp: new Date().toISOString(),
          level: 'warn',
          message: 'Task execution paused waiting for upstream task dependencies.',
          agentId: task.assigned_agent,
        });
        taskMap.set(task.id, task);
        onUpdate?.(Array.from(taskMap.values()));
        continue;
      }

      await this.executeTask(task, (updatedTask) => {
        taskMap.set(updatedTask.id, updatedTask);
        onUpdate?.(Array.from(taskMap.values()));
      });
    }

    return Array.from(taskMap.values());
  }
}
