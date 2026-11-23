import { ToolRegistry } from '../../lib/tools/toolRegistry';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const registry = ToolRegistry.getInstance();

  if (req.method === 'GET') {
    return res.json({ tools: registry.getTools() });
  }

  if (req.method === 'POST') {
    const { toolId, action, payload, agentId } = req.body;
    try {
      const result = await registry.executeTool(toolId, { agentId, action, payload });
      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Tool execution failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
