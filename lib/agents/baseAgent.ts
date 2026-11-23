import { AgentId, AgentProfile, AgentTask, TaskResult } from '../../src/types/agentTypes';
import { ToolRegistry } from '../tools/toolRegistry';

export abstract class BaseAgent {
  public abstract readonly id: AgentId;
  public abstract readonly name: string;
  public abstract readonly role: string;
  public abstract readonly tagline: string;
  public abstract readonly department: string;
  public abstract readonly avatar: string;
  public abstract readonly color: string;
  public abstract readonly accentBg: string;
  public abstract readonly responsibilities: string[];
  public abstract readonly capabilities: string[];
  public abstract readonly availableTools: string[];

  public getProfile(): AgentProfile {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      tagline: this.tagline,
      department: this.department,
      avatar: this.avatar,
      color: this.color,
      accentBg: this.accentBg,
      status: 'available',
      responsibilities: this.responsibilities,
      capabilities: this.capabilities,
      availableTools: this.availableTools,
      totalTasksCompleted: 142,
      successRate: 99.2,
      avgLatency: '1.4s',
    };
  }

  public validateTask(task: AgentTask): { valid: boolean; reason?: string } {
    if (task.assigned_agent !== this.id) {
      return {
        valid: false,
        reason: `Task is assigned to ${task.assigned_agent}, but dispatched to ${this.id}.`,
      };
    }
    return { valid: true };
  }

  public abstract execute(
    task: AgentTask,
    onProgress?: (progress: number, logMessage: string, level?: 'info' | 'warn' | 'error' | 'success') => void
  ): Promise<TaskResult>;

  protected async callGeminiIfAvailable(
    prompt: string,
    fallbackText: string
  ): Promise<{ text: string; usedGemini: boolean }> {
    const registry = ToolRegistry.getInstance();
    const result = await registry.executeTool('gemini', {
      agentId: this.id,
      action: 'generate',
      payload: { prompt },
    });

    if (result.success && result.data?.text) {
      return { text: result.data.text, usedGemini: true };
    }
    return { text: fallbackText, usedGemini: false };
  }
}
