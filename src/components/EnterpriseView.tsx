import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  Users,
  Key,
  FileCheck,
  Coins,
  Lock,
  Download,
  Plus,
  BarChart2,
  CheckCircle2,
  Sliders,
  Database,
  Globe,
} from 'lucide-react';
import { UserRole } from '../types';

interface EnterpriseViewProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const EnterpriseView: React.FC<EnterpriseViewProps> = ({ userRole, onRoleChange }) => {
  const [activeTab, setActiveTab] = useState<'workspaces' | 'rbac' | 'sso_security' | 'audit_logs' | 'ai_tokens'>('workspaces');

  // Workspaces
  const workspaces = [
    { name: 'Shuroq Enterprise Main Org', brandCount: 4, members: 18, status: 'Active Workspace', plan: 'Enterprise Unlimited' },
    { name: 'Shuroq Cloud Solutions Client Hub', brandCount: 2, members: 8, status: 'Agency Client Hub', plan: 'Enterprise Dedicated' },
    { name: 'Shuroq R&D Sandbox', brandCount: 1, members: 5, status: 'Staging Environment', plan: 'Developer Tier' },
  ];

  // Audit Logs
  const auditLogs = [
    { user: 'Alex Rivera (Admin)', action: 'Updated Brand Guidelines for Shuroq Cloud', timestamp: 'Today, 08:32 AM', ip: '192.168.1.42' },
    { user: 'Sarah Chen (Strategy Lead)', action: 'Triggered Weekly Competitor SWOT Analysis Job', timestamp: 'Today, 07:15 AM', ip: '10.0.0.12' },
    { user: 'Marcus Vance (Editor)', action: 'Approved Post #post-102 for LinkedIn Scheduling', timestamp: 'Yesterday, 05:40 PM', ip: '172.16.0.8' },
    { user: 'Elena Rostova (DevOps)', action: 'Generated Production API Token (shuroq_live_sec_...)', timestamp: 'Yesterday, 02:10 PM', ip: '192.168.1.15' },
  ];

  // Token Usage Stats
  const tokenStats = {
    totalTokensUsed: '4,820,150',
    tokensLimit: '10,000,000 / month',
    estimatedCost: '$241.00 USD',
    topModel: 'Gemini 2.5 Flash / Pro Hybrid',
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl p-6 rounded-2xl shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
              Governance & Compliance
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight mt-1.5 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" /> Enterprise Workspace & RBAC Controls
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage multi-brand workspaces, role-based access control, Single Sign-On (SSO), audit trails, and AI token costs.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2.5">
          <span className="text-xs font-semibold text-slate-400 font-mono">Role Preview:</span>
          <select
            value={userRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="bg-[#070b14] border border-cyan-500/30 text-cyan-300 text-xs font-bold font-mono rounded-xl px-3.5 py-2 focus:outline-none cursor-pointer"
          >
            <option value="admin">Admin (Full Access)</option>
            <option value="team_member">Team Member (Editor)</option>
            <option value="viewer">Viewer (Read-Only)</option>
          </select>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 text-xs font-medium overflow-x-auto">
        <button
          onClick={() => setActiveTab('workspaces')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'workspaces'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)]'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Building className="w-4 h-4 text-cyan-400" /> Multi-Workspace & Agency Hub
        </button>

        <button
          onClick={() => setActiveTab('rbac')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'rbac'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)]'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Users className="w-4 h-4 text-purple-400" /> Roles & Permissions (RBAC)
        </button>

        <button
          onClick={() => setActiveTab('sso_security')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'sso_security'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)]'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Lock className="w-4 h-4 text-emerald-400" /> SSO & Security Compliance
        </button>

        <button
          onClick={() => setActiveTab('audit_logs')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'audit_logs'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)]'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <FileCheck className="w-4 h-4 text-amber-400" /> Audit Logs
        </button>

        <button
          onClick={() => setActiveTab('ai_tokens')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'ai_tokens'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)]'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Coins className="w-4 h-4 text-cyan-400" /> AI Token Usage & Costs
        </button>
      </div>

      {/* TAB 1: Workspaces */}
      {activeTab === 'workspaces' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <Building className="w-4 h-4 text-cyan-400" /> Provisioned Workspaces & Agency Hubs
            </h3>
            <button className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(147,51,234,0.25)] transition-all cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Create New Workspace
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workspaces.map((ws, i) => (
              <div key={i} className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-3.5 shadow-xl hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <span className="font-bold text-white text-xs">{ws.name}</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold font-mono">
                    {ws.status}
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-mono space-y-1">
                  <p>• {ws.brandCount} Managed Brands</p>
                  <p>• {ws.members} Active Team Members</p>
                  <p>• Tier: <strong className="text-cyan-300">{ws.plan}</strong></p>
                </div>

                <button className="w-full py-2 bg-[#070b14] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl text-xs font-semibold text-cyan-300 transition-colors font-mono cursor-pointer">
                  Switch to Workspace
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RBAC */}
      {activeTab === 'rbac' && (
        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3 font-mono">
            <Users className="w-4 h-4 text-purple-400" /> Role-Based Access Control Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#070b14] text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Feature / Capability</th>
                  <th className="p-3.5">Admin</th>
                  <th className="p-3.5">Editor / Strategist</th>
                  <th className="p-3.5 rounded-r-xl">Viewer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                <tr>
                  <td className="p-3.5 font-semibold">AI Content Generation & Editing</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Full Access</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Full Access</td>
                  <td className="p-3.5 text-slate-500">Read-Only</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold">Post Publishing & Queue Approval</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Full Access</td>
                  <td className="p-3.5 text-amber-400 font-bold">Requires Approval</td>
                  <td className="p-3.5 text-slate-500">Read-Only</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold">Brand Voice & Asset Management</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Full Access</td>
                  <td className="p-3.5 text-slate-500">Read-Only</td>
                  <td className="p-3.5 text-slate-500">Read-Only</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold">API Keys & Outbound Webhooks</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Full Access</td>
                  <td className="p-3.5 text-slate-500">No Access</td>
                  <td className="p-3.5 text-slate-500">No Access</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SSO & Compliance */}
      {activeTab === 'sso_security' && (
        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3 font-mono">
            <Lock className="w-4 h-4 text-emerald-400" /> Single Sign-On (SAML 2.0 / Okta / Azure AD)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4 space-y-2">
              <span className="font-bold text-white block">SAML 2.0 Identity Provider</span>
              <p className="text-slate-400">Status: <strong className="text-emerald-400">Configured & Enforced</strong></p>
              <p className="text-slate-500">Entity ID: https://auth.marketmind.ai/saml/metadata</p>
            </div>

            <div className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4 space-y-2">
              <span className="font-bold text-white block">Data Privacy & SOC2 Compliance</span>
              <p className="text-slate-400">SOC2 Type II Certified • GDPR Compliant • Zero Data Retention on AI Inputs</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Audit Logs */}
      {activeTab === 'audit_logs' && (
        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <FileCheck className="w-4 h-4 text-amber-400" /> Immutable Workspace Audit Trail
            </h3>
            <button className="px-3 py-1.5 bg-[#070b14] hover:bg-white/[0.06] border border-white/[0.06] rounded-lg text-xs font-bold text-slate-300 flex items-center gap-1 font-mono transition-colors cursor-pointer">
              <Download className="w-3.5 h-3.5" /> Export Audit CSV
            </button>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="bg-[#070b14] border border-white/[0.06] rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{log.action}</span>
                  <span className="text-[10px] text-slate-400">{log.user} • IP: {log.ip}</span>
                </div>
                <span className="text-[10px] text-cyan-400 font-mono">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AI Tokens */}
      {activeTab === 'ai_tokens' && (
        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3 font-mono">
            <Coins className="w-4 h-4 text-cyan-400" /> AI Model Token Usage & Cost Allocation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Tokens Consumed</span>
              <p className="text-lg font-extrabold text-white mt-1">{tokenStats.totalTokensUsed}</p>
            </div>

            <div className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Monthly Allocation</span>
              <p className="text-lg font-extrabold text-emerald-400 mt-1">{tokenStats.tokensLimit}</p>
            </div>

            <div className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Estimated Spend</span>
              <p className="text-lg font-extrabold text-cyan-400 mt-1">{tokenStats.estimatedCost}</p>
            </div>

            <div className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Primary AI Engine</span>
              <p className="text-xs font-bold text-purple-300 mt-2">{tokenStats.topModel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
