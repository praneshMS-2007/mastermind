import { ExecutionEngine } from '../../lib/orchestration/executionEngine';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const engine = ExecutionEngine.getInstance();
    const profiles = engine.getAllAgentProfiles();
    return res.json({ agents: profiles });
  } catch (error: any) {
    console.error('Error fetching agents:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch agents' });
  }
}
