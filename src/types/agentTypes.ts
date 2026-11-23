export type AgentId =
  | 'ceo'
  | 'hr'
  | 'sales'
  | 'marketing'
  | 'development'
  | 'operations'
  | 'support'
  | 'analytics';

export type AgentStatus =
  | 'available'
  | 'planning'
  | 'waiting_for_approval'
  | 'running'
  | 'completed'
  | 'failed'
  | 'blocked';

export type TaskApprovalStatus = 'pending' | 'approved' | 'rejected';

export type TaskExecutionStatus =
  | 'not_started'
  | 'pending_approval'
  | 'approved'
  | 'queued'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'blocked';

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface ExecutionLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  agentId?: AgentId;
}

export interface TaskArtifact {
  id: string;
  title: string;
  type: 'report' | 'code' | 'sop' | 'spec' | 'csv' | 'json' | 'markdown';
  content: string;
  url?: string;
  metadata?: Record<string, any>;
}

export interface TaskResult {
  summary: string;
  content: string;
  artifacts?: TaskArtifact[];
  metrics?: Record<string, any>;
  suggestedNextSteps?: string[];
}

export interface AgentTask {
  id: string;
  project_id: string;
  objective: string;
  assigned_agent: AgentId;
  description: string;
  subtasks: string[];
  completed_subtasks?: string[];
  priority: TaskPriority;
  dependencies: string[]; // task IDs
  required_tools: string[]; // tool IDs like 'gemini', 'web_search', 'github', etc.
  expected_output: string;
  approval_status: TaskApprovalStatus;
  execution_status: TaskExecutionStatus;
  progress: number; // 0 to 100
  result?: TaskResult;
  error?: string;
  logs: ExecutionLog[];
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface AgentProfile {
  id: AgentId;
  name: string;
  role: string;
  tagline: string;
  department: string;
  avatar: string;
  color: string;
  accentBg: string;
  status: AgentStatus;
  responsibilities: string[];
  capabilities: string[];
  availableTools: string[];
  totalTasksCompleted: number;
  successRate: number;
  avgLatency: string;
  currentTaskId?: string;
  currentTaskTitle?: string;
}

export interface AgentProject {
  id: string;
  title: string;
  objective: string;
  status: 'planning' | 'pending_approval' | 'in_progress' | 'completed' | 'failed';
  assigned_agents: AgentId[];
  created_at: string;
  updated_at: string;
  strategy_summary?: string;
  plan_notes?: string;
  progress?: number;
}

export interface AgentTool {
  id: string;
  name: string;
  description: string;
  category: 'ai' | 'search' | 'code' | 'crm' | 'analytics' | 'automation' | 'communication' | 'database';
  iconName: string;
  isConnected: boolean;
  agentPermissions: AgentId[];
  endpoint?: string;
  docsUrl?: string;
  requiresConfig?: boolean;
  configKey?: string;
}
