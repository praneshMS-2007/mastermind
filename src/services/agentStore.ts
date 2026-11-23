import {
  AgentId,
  AgentProfile,
  AgentProject,
  AgentTask,
  AgentTool,
  ExecutionLog,
  TaskPriority,
} from '../types/agentTypes';
import { CeoAgent } from '../../lib/agents/ceoAgent';
import { ExecutionEngine } from '../../lib/orchestration/executionEngine';
import { INITIAL_TOOLS, ToolRegistry } from '../../lib/tools/toolRegistry';

const STORAGE_KEY_PROJECTS = 'marketmind_ai_workforce_projects';
const STORAGE_KEY_TASKS = 'marketmind_ai_workforce_tasks';
const STORAGE_KEY_TOOLS = 'marketmind_ai_workforce_tools';

export class AgentStore {
  private static instance: AgentStore;
  private projects: AgentProject[] = [];
  private tasks: AgentTask[] = [];
  private tools: AgentTool[] = INITIAL_TOOLS;
  private activeProjectId: string = '';
  private listeners: Set<() => void> = new Set();
  private isExecuting: boolean = false;

  private constructor() {
    this.loadFromStorage();
    if (this.projects.length === 0) {
      this.seedInitialProject();
    } else {
      this.activeProjectId = this.projects[0].id;
    }
  }

  public static getInstance(): AgentStore {
    if (!AgentStore.instance) {
      AgentStore.instance = new AgentStore();
    }
    return AgentStore.instance;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.saveToStorage();
    this.listeners.forEach((listener) => listener());
  }

  private loadFromStorage() {
    try {
      const storedProjects = localStorage.getItem(STORAGE_KEY_PROJECTS);
      const storedTasks = localStorage.getItem(STORAGE_KEY_TASKS);
      const storedTools = localStorage.getItem(STORAGE_KEY_TOOLS);

      if (storedProjects) this.projects = JSON.parse(storedProjects);
      if (storedTasks) this.tasks = JSON.parse(storedTasks);
      if (storedTools) this.tools = JSON.parse(storedTools);
    } catch {
      // ignore storage errors
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(this.projects));
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(this.tasks));
      localStorage.setItem(STORAGE_KEY_TOOLS, JSON.stringify(this.tools));
    } catch {
      // ignore storage errors
    }
  }

  private seedInitialProject() {
    const projectId = 'proj-shuroq-onboarding';
    const initialProj: AgentProject = {
      id: projectId,
      title: 'AI-Powered Client Onboarding System for Shuroq',
      objective: 'Build an AI-powered client onboarding system for Shuroq.',
      status: 'pending_approval',
      assigned_agents: ['hr', 'marketing', 'sales', 'development', 'operations', 'support', 'analytics'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      strategy_summary:
        'Executive Plan for Shuroq: Deploying a 7-agent coordinated workforce to architect automated provisioning, marketing positioning, B2B sales sequence, enterprise SOPs, and live KPI telemetry.',
      progress: 0,
    };

    const ceo = new CeoAgent();
    // Synchronously generate initial task templates for prompt
    const initialTasks: AgentTask[] = [
      {
        id: `task-init-1`,
        project_id: projectId,
        objective: 'Define team and resource requirements for Shuroq onboarding',
        assigned_agent: 'hr',
        description: 'Analyze operational workload and define required specialist roles, hiring needs, and onboarding schedules for Shuroq.',
        subtasks: [
          'Calculate headcount requirements for enterprise rollout',
          'Draft job specifications for Solution Architects & Account Executives',
          'Create internal training & compliance onboarding checklist',
          'Establish resource allocation matrix',
        ],
        completed_subtasks: [],
        priority: 'high',
        dependencies: [],
        required_tools: ['gemini', 'email'],
        expected_output: 'Resource Allocation Matrix & Staffing Requirements Spec',
        approval_status: 'pending',
        execution_status: 'pending_approval',
        progress: 0,
        logs: [
          {
            id: 'log-1',
            timestamp: new Date().toISOString(),
            level: 'info',
            message: 'CEO Agent created task assignment for HR Agent. Awaiting human approval.',
            agentId: 'ceo',
          },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: `task-init-2`,
        project_id: projectId,
        objective: 'Conduct market research & competitive positioning for Shuroq',
        assigned_agent: 'marketing',
        description: 'Perform deep market research, SWOT analysis against enterprise competitors, and develop value proposition positioning.',
        subtasks: [
          'Identify top 5 industry competitors and benchmark pricing',
          'Perform automated SWOT analysis on enterprise value propositions',
          'Identify underserved market gaps and positioning angles',
          'Draft multi-channel launch campaign & SEO pillar strategy',
        ],
        completed_subtasks: [],
        priority: 'high',
        dependencies: [],
        required_tools: ['gemini', 'web_search', 'firecrawl'],
        expected_output: 'Competitor Intelligence & Market Positioning Dossier',
        approval_status: 'pending',
        execution_status: 'pending_approval',
        progress: 0,
        logs: [
          {
            id: 'log-2',
            timestamp: new Date().toISOString(),
            level: 'info',
            message: 'CEO Agent created task assignment for Marketing Agent. Awaiting human approval.',
            agentId: 'ceo',
          },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: `task-init-3`,
        project_id: projectId,
        objective: 'Design client acquisition, ICP qualification & cold outreach for Shuroq',
        assigned_agent: 'sales',
        description: 'Map out the ideal customer profile (ICP), lead qualification criteria, automated cold email sequences, and CRM pipeline triggers.',
        subtasks: [
          'Define ICP criteria for B2B Decision Makers (CTOs, VPs)',
          'Draft 4-stage personalized cold email outreach sequence',
          'Configure CRM pipeline stages and lead scoring rules',
          'Generate executive client onboarding proposal template',
        ],
        completed_subtasks: [],
        priority: 'high',
        dependencies: ['task-init-2'],
        required_tools: ['gemini', 'crm', 'email', 'web_search'],
        expected_output: 'Sales Playbook, Cold Outreach Sequence & CRM Configuration',
        approval_status: 'pending',
        execution_status: 'pending_approval',
        progress: 0,
        logs: [
          {
            id: 'log-3',
            timestamp: new Date().toISOString(),
            level: 'info',
            message: 'CEO Agent created task assignment for Sales Agent. Awaiting human approval.',
            agentId: 'ceo',
          },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: `task-init-4`,
        project_id: projectId,
        objective: 'Design technical architecture, API integration & onboarding portal',
        assigned_agent: 'development',
        description: 'Architect technical system components, API data contracts, authentication flow, automated webhooks, and client onboarding portal.',
        subtasks: [
          'Design microservices architecture & RESTful API schema',
          'Generate database schema & data migration scripts',
          'Scaffold client onboarding webhook ingestion pipeline',
          'Draft automated integration test suite & deployment runbook',
        ],
        completed_subtasks: [],
        priority: 'critical',
        dependencies: ['task-init-1'],
        required_tools: ['gemini', 'github', 'automation'],
        expected_output: 'Technical Architecture Document, API Specs & Code Scaffolding',
        approval_status: 'pending',
        execution_status: 'pending_approval',
        progress: 0,
        logs: [
          {
            id: 'log-4',
            timestamp: new Date().toISOString(),
            level: 'info',
            message: 'CEO Agent created task assignment for Development Agent. Awaiting human approval.',
            agentId: 'ceo',
          },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: `task-init-5`,
        project_id: projectId,
        objective: 'Create standard operating procedures (SOPs) & client onboarding workflow',
        assigned_agent: 'operations',
        description: 'Map out end-to-end client journey, automated handoff protocols between teams, SLA tracking, and operational SOPs.',
        subtasks: [
          'Map complete step-by-step client onboarding lifecycle (Day 0 to Day 30)',
          'Create Standard Operating Procedure (SOP) for enterprise onboarding',
          'Define escalation protocols for delayed client milestones',
          'Configure automated task handoff triggers between Sales and Engineering',
        ],
        completed_subtasks: [],
        priority: 'medium',
        dependencies: ['task-init-3', 'task-init-4'],
        required_tools: ['gemini', 'automation'],
        expected_output: 'Enterprise Onboarding SOPs & Workflow Playbook',
        approval_status: 'pending',
        execution_status: 'pending_approval',
        progress: 0,
        logs: [
          {
            id: 'log-5',
            timestamp: new Date().toISOString(),
            level: 'info',
            message: 'CEO Agent created task assignment for Operations Agent. Awaiting human approval.',
            agentId: 'ceo',
          },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: `task-init-6`,
        project_id: projectId,
        objective: 'Establish support triage matrix, customer FAQs & ticketing workflows',
        assigned_agent: 'support',
        description: 'Generate comprehensive client FAQs, automated chatbot response matrix, and ticket classification routing for Shuroq.',
        subtasks: [
          'Create 20+ enterprise onboarding FAQs with verified answers',
          'Configure Tier 1 / Tier 2 ticket classification taxonomy',
          'Draft incident escalation and emergency resolution SOPs',
        ],
        completed_subtasks: [],
        priority: 'medium',
        dependencies: ['task-init-5'],
        required_tools: ['gemini', 'email'],
        expected_output: 'Customer Support FAQ Knowledge Base & Triage Rules',
        approval_status: 'pending',
        execution_status: 'pending_approval',
        progress: 0,
        logs: [
          {
            id: 'log-6',
            timestamp: new Date().toISOString(),
            level: 'info',
            message: 'CEO Agent created task assignment for Support Agent. Awaiting human approval.',
            agentId: 'ceo',
          },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: `task-init-7`,
        project_id: projectId,
        objective: 'Define onboarding KPIs, funnel telemetry & executive analytics dashboard',
        assigned_agent: 'analytics',
        description: 'Define success metrics (Time to Value, Onboarding Completion Rate, Net Promoter Score) and configure real-time executive dashboard.',
        subtasks: [
          'Define primary enterprise KPIs (Time-to-Value, Activation Rate, Retention)',
          'Create SQL tracking queries & PostHog funnel event definitions',
          'Design Executive Overview dashboard mockups with live telemetry',
          'Establish automated weekly executive reporting digests',
        ],
        completed_subtasks: [],
        priority: 'high',
        dependencies: ['task-init-4', 'task-init-5'],
        required_tools: ['gemini', 'analytics_db'],
        expected_output: 'KPI Telemetry Model, Funnel Analytics & Reporting Dashboard',
        approval_status: 'pending',
        execution_status: 'pending_approval',
        progress: 0,
        logs: [
          {
            id: 'log-7',
            timestamp: new Date().toISOString(),
            level: 'info',
            message: 'CEO Agent created task assignment for Analytics Agent. Awaiting human approval.',
            agentId: 'ceo',
          },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    this.projects = [initialProj];
    this.tasks = initialTasks;
    this.activeProjectId = projectId;
    this.saveToStorage();
  }

  // --- Projects API ---
  public getProjects(): AgentProject[] {
    return this.projects;
  }

  public getActiveProject(): AgentProject | undefined {
    return this.projects.find((p) => p.id === this.activeProjectId) || this.projects[0];
  }

  public setActiveProject(projectId: string) {
    this.activeProjectId = projectId;
    this.notify();
  }

  public async createProjectWithPlan(
    objective: string,
    brandInfo?: { brandName?: string; industry?: string }
  ): Promise<AgentProject> {
    const projectId = `proj-${Date.now()}`;
    const ceo = new CeoAgent();

    const plan = await ceo.createExecutionPlan(projectId, objective, brandInfo);

    const newProject: AgentProject = {
      id: projectId,
      title: objective.length > 50 ? objective.slice(0, 47) + '...' : objective,
      objective,
      status: 'pending_approval',
      assigned_agents: Array.from(new Set(plan.tasks.map((t) => t.assigned_agent))),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      strategy_summary: plan.strategySummary,
      progress: 0,
    };

    this.projects.unshift(newProject);
    this.tasks = [...plan.tasks, ...this.tasks];
    this.activeProjectId = projectId;
    this.notify();
    return newProject;
  }

  // --- Tasks API ---
  public getTasks(projectId?: string): AgentTask[] {
    if (projectId) {
      return this.tasks.filter((t) => t.project_id === projectId);
    }
    return this.tasks;
  }

  public getTaskById(taskId: string): AgentTask | undefined {
    return this.tasks.find((t) => t.id === taskId);
  }

  public editTask(
    taskId: string,
    updates: Partial<{
      assigned_agent: AgentId;
      objective: string;
      description: string;
      priority: TaskPriority;
      subtasks: string[];
      required_tools: string[];
      dependencies: string[];
      expected_output: string;
    }>
  ) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    Object.assign(task, updates);
    task.updated_at = new Date().toISOString();
    task.logs.push({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      level: 'info',
      message: `Task details edited by user.`,
    });
    this.notify();
  }

  public reassignTask(taskId: string, newAgentId: AgentId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    const prevAgent = task.assigned_agent;
    task.assigned_agent = newAgentId;
    task.updated_at = new Date().toISOString();
    task.logs.push({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      level: 'info',
      message: `Task reassigned from ${prevAgent.toUpperCase()} Agent to ${newAgentId.toUpperCase()} Agent.`,
      agentId: newAgentId,
    });
    this.notify();
  }

  public removeTask(taskId: string) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    this.notify();
  }

  public approveTask(taskId: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.approval_status = 'approved';
    task.execution_status = 'approved';
    task.updated_at = new Date().toISOString();
    task.logs.push({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      level: 'success',
      message: `Task explicitly approved by human supervisor. Queued for execution.`,
    });
    this.notify();
  }

  public rejectTask(taskId: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.approval_status = 'rejected';
    task.execution_status = 'cancelled';
    task.updated_at = new Date().toISOString();
    task.logs.push({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      level: 'warn',
      message: `Task rejected by human supervisor.`,
    });
    this.notify();
  }

  /**
   * Human Approval Layer: Approves all tasks in project and triggers multi-agent execution!
   */
  public async approvePlanAndExecute(projectId: string) {
    const project = this.projects.find((p) => p.id === projectId);
    if (!project) return;

    project.status = 'in_progress';
    const projectTasks = this.tasks.filter((t) => t.project_id === projectId);

    projectTasks.forEach((t) => {
      t.approval_status = 'approved';
      if (t.execution_status === 'pending_approval' || t.execution_status === 'not_started') {
        t.execution_status = 'approved';
      }
    });

    this.notify();
    await this.runExecutionQueue(projectId);
  }

  public async retryTask(taskId: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.approval_status = 'approved';
    task.execution_status = 'approved';
    task.error = undefined;
    task.progress = 0;
    task.updated_at = new Date().toISOString();
    task.logs.push({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      level: 'info',
      message: `Task retry requested by human supervisor.`,
    });

    this.notify();
    await this.runExecutionQueue(task.project_id);
  }

  public cancelTask(taskId: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.execution_status = 'cancelled';
    task.updated_at = new Date().toISOString();
    task.logs.push({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      level: 'warn',
      message: `Task cancelled by human supervisor.`,
    });
    this.notify();
  }

  private async runExecutionQueue(projectId: string) {
    if (this.isExecuting) return;
    this.isExecuting = true;

    try {
      const engine = ExecutionEngine.getInstance();
      const projectTasks = this.tasks.filter((t) => t.project_id === projectId);

      await engine.executePlan(projectTasks, (updatedList) => {
        // Merge updated tasks
        updatedList.forEach((ut) => {
          const idx = this.tasks.findIndex((t) => t.id === ut.id);
          if (idx !== -1) {
            this.tasks[idx] = ut;
          }
        });

        // Compute overall progress
        const projTasks = this.tasks.filter((t) => t.project_id === projectId);
        const completedCount = projTasks.filter((t) => t.execution_status === 'completed').length;
        const totalCount = projTasks.length || 1;
        const project = this.projects.find((p) => p.id === projectId);
        if (project) {
          project.progress = Math.round((completedCount / totalCount) * 100);
          if (completedCount === totalCount) {
            project.status = 'completed';
          }
        }

        this.notify();
      });
    } finally {
      this.isExecuting = false;
      this.notify();
    }
  }

  // --- Agents API ---
  public getAgentProfiles(): AgentProfile[] {
    const engine = ExecutionEngine.getInstance();
    const profiles = engine.getAllAgentProfiles();

    // Enrich profiles with dynamic state from store
    return profiles.map((p) => {
      const agentTasks = this.tasks.filter((t) => t.assigned_agent === p.id);
      const runningTask = agentTasks.find((t) => t.execution_status === 'running');
      const completedCount = agentTasks.filter((t) => t.execution_status === 'completed').length;
      const failedCount = agentTasks.filter((t) => t.execution_status === 'failed').length;

      let status = p.status;
      if (runningTask) {
        status = 'running';
      } else if (agentTasks.some((t) => t.approval_status === 'pending')) {
        status = 'waiting_for_approval';
      } else if (failedCount > 0 && !runningTask) {
        status = 'failed';
      } else if (completedCount > 0) {
        status = 'completed';
      }

      return {
        ...p,
        status,
        currentTaskId: runningTask?.id,
        currentTaskTitle: runningTask?.objective,
        totalTasksCompleted: p.totalTasksCompleted + completedCount,
      };
    });
  }

  // --- Tools API ---
  public getTools(): AgentTool[] {
    return this.tools;
  }

  public toggleToolConnection(toolId: string, connected: boolean) {
    const tool = this.tools.find((t) => t.id === toolId);
    if (tool) {
      tool.isConnected = connected;
      ToolRegistry.getInstance().setToolConnected(toolId, connected);
      this.notify();
    }
  }

  // --- Analytics API ---
  public getAnalytics() {
    const totalProjects = this.projects.length;
    const activeProjects = this.projects.filter(
      (p) => p.status === 'in_progress' || p.status === 'pending_approval'
    ).length;
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter((t) => t.execution_status === 'completed').length;
    const failedTasks = this.tasks.filter((t) => t.execution_status === 'failed').length;
    const pendingApprovalTasks = this.tasks.filter((t) => t.approval_status === 'pending').length;
    const runningTasks = this.tasks.filter((t) => t.execution_status === 'running').length;

    const successRate = totalTasks > 0 ? Math.round((completedTasks / (completedTasks + failedTasks || 1)) * 100) : 100;

    // Agent utilization breakdown
    const agentProfiles = this.getAgentProfiles();
    const agentUtilization = agentProfiles.map((agent) => {
      const agentTasks = this.tasks.filter((t) => t.assigned_agent === agent.id);
      return {
        id: agent.id,
        name: agent.name,
        department: agent.department,
        totalTasks: agentTasks.length,
        completedTasks: agentTasks.filter((t) => t.execution_status === 'completed').length,
        failedTasks: agentTasks.filter((t) => t.execution_status === 'failed').length,
        runningTasks: agentTasks.filter((t) => t.execution_status === 'running').length,
        status: agent.status,
      };
    });

    return {
      totalProjects,
      activeProjects,
      totalTasks,
      completedTasks,
      failedTasks,
      pendingApprovalTasks,
      runningTasks,
      successRate,
      avgCompletionTime: '3.2s',
      agentUtilization,
    };
  }
}
