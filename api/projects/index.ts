import { CeoAgent } from '../../lib/agents/ceoAgent';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    try {
      const { objective, brandName, industry } = req.body;
      if (!objective) {
        return res.status(400).json({ error: 'Objective is required' });
      }

      const projectId = `proj-${Date.now()}`;
      const ceo = new CeoAgent();
      const plan = await ceo.createExecutionPlan(projectId, objective, { brandName, industry });

      const project = {
        id: projectId,
        title: objective.length > 50 ? objective.slice(0, 47) + '...' : objective,
        objective,
        status: 'pending_approval',
        assigned_agents: Array.from(new Set(plan.tasks.map((t) => t.assigned_agent))),
        strategy_summary: plan.strategySummary,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        progress: 0,
      };

      return res.json({ project, tasks: plan.tasks });
    } catch (error: any) {
      console.error('Error generating project plan:', error);
      return res.status(500).json({ error: error.message || 'Failed to generate plan' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
