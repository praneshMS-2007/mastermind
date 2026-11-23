import { ExecutionEngine } from '../../lib/orchestration/executionEngine';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { action, task, tasks } = req.body;
    const engine = ExecutionEngine.getInstance();

    try {
      if (action === 'execute_task' && task) {
        const result = await engine.executeTask(task);
        return res.json({ task: result });
      }

      if (action === 'execute_plan' && tasks) {
        const results = await engine.executePlan(tasks);
        return res.json({ tasks: results });
      }

      return res.status(400).json({ error: 'Invalid action specified' });
    } catch (error: any) {
      console.error('Error in task execution endpoint:', error);
      return res.status(500).json({ error: error.message || 'Task execution failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
