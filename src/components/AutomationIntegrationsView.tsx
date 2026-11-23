import React, { useState, useEffect } from 'react';
import {
  Zap,
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  RefreshCw,
  Sliders,
  Webhook,
  Database,
  Link,
  ShieldCheck,
  Send,
  Bell,
  Layers,
  Code,
  Copy,
  Check,
} from 'lucide-react';
import { BrandSettings } from '../types';

interface AutomationIntegrationsViewProps {
  brandSettings: BrandSettings;
}

interface SocialAccount {
  platform: string;
  isConnected: boolean;
  username: string | null;
  platformUserId: string | null;
  connectedAt: string | null;
}

export const AutomationIntegrationsView: React.FC<AutomationIntegrationsViewProps> = () => {
  const [activeTab, setActiveTab] = useState<'workflows' | 'scheduled_jobs' | 'integrations' | 'api_webhooks' | 'social_accounts'>('workflows');

  // Workflows
  const [workflows, setWorkflows] = useState([
    {
      id: 'wf-1',
      name: 'Auto-Publish Weekly Shuroq Tech Digest',
      trigger: 'Every Monday at 09:00 AM UTC',
      action: 'Generate LinkedIn & Blog Post from Trending Signals',
      status: 'Active',
      lastRun: 'Today, 09:00 AM',
      executions: 24,
    },
    {
      id: 'wf-2',
      name: 'Slack Notification on AI Quality Score < 80%',
      trigger: 'Post Created in In Review State',
      action: 'Send Warning Alert to #marketing-approvals in Slack',
      status: 'Active',
      lastRun: 'Yesterday, 04:15 PM',
      executions: 18,
    },
    {
      id: 'wf-3',
      name: 'Sync Published Posts to HubSpot CRM Campaigns',
      trigger: 'Post Status Changed to Published',
      action: 'Push Metadata & Engagement Metrics to HubSpot',
      status: 'Active',
      lastRun: '2 days ago',
      executions: 56,
    },
  ]);

  // Social Accounts State
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [showTokenModal, setShowTokenModal] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState('');
  const [userIdInput, setUserIdInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [connectError, setConnectError] = useState<string | null>(null);
  const [connectSuccess, setConnectSuccess] = useState<string | null>(null);

  const platformIcons: Record<string, string> = {
    linkedin: '💼',
    twitter: '🐦',
    instagram: '📸',
    facebook: '📘',
  };

  const platformColors: Record<string, string> = {
    linkedin: 'from-blue-600 to-blue-800',
    twitter: 'from-sky-500 to-sky-700',
    instagram: 'from-pink-500 via-purple-500 to-orange-500',
    facebook: 'from-blue-700 to-blue-900',
  };

  // Fetch social accounts
  const fetchSocialAccounts = async () => {
    setLoadingAccounts(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/social/accounts', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setSocialAccounts(data.accounts || []);
    } catch (err) {
      console.error('Failed to fetch social accounts:', err);
    } finally {
      setLoadingAccounts(false);
    }
  };

  useEffect(() => {
    fetchSocialAccounts();
  }, []);

  // Connect a social account
  const handleConnect = async (platform: string) => {
    setConnectError(null);
    setConnectSuccess(null);
    setConnectingPlatform(platform);

    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/social/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          platform,
          accessToken: tokenInput,
          platformUserId: userIdInput,
          platformUsername: usernameInput,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setConnectSuccess(`Successfully connected ${platform}!`);
        setShowTokenModal(null);
        setTokenInput('');
        setUserIdInput('');
        setUsernameInput('');
        fetchSocialAccounts();
      } else {
        setConnectError(data.error || `Failed to connect ${platform}`);
      }
    } catch (err: any) {
      setConnectError(err.message || 'Network error');
    } finally {
      setConnectingPlatform(null);
    }
  };

  // Disconnect a social account
  const handleDisconnect = async (platform: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      await fetch(`/api/social/accounts?platform=${platform}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      fetchSocialAccounts();
    } catch (err) {
      console.error('Failed to disconnect:', err);
    }
  };

  // Integrations List
  const integrations = [
    { name: 'HubSpot CRM', category: 'CRM', icon: '🧡', status: 'Connected', account: 'Shuroq Portal (ID: 882194)' },
    { name: 'Salesforce Marketing Cloud', category: 'CRM', icon: '☁️', status: 'Connected', account: 'Shuroq Prod Org' },
    { name: 'Google Drive & Workspace', category: 'Storage', icon: '📁', status: 'Connected', account: 'assets@shuroqtech.com' },
    { name: 'Notion Knowledge Base', category: 'Docs', icon: '📝', status: 'Connected', account: 'Shuroq Brand Workspace' },
    { name: 'Slack Workspace', category: 'Messaging', icon: '💬', status: 'Connected', account: '#shuroq-announcements' },
    { name: 'Zapier Automation', category: 'IPaaS', icon: '⚡', status: 'Connected', account: 'ApiKey Verified' },
    { name: 'n8n Workflow Engine', category: 'IPaaS', icon: '🔄', status: 'Connected', account: 'Self-Hosted Webhook' },
  ];

  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: w.status === 'Active' ? 'Paused' : 'Active' } : w))
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl p-6 rounded-2xl shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
              Autonomous Operations Fleet
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight mt-1.5 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" /> Automation Workflows & Integration Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Connect LinkedIn, Twitter, Instagram, Facebook, HubSpot, Salesforce, Slack, Notion, Google Drive, n8n, Zapier & custom Webhooks.
          </p>
        </div>

        <button className="relative z-10 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.25)] transition-all self-start md:self-auto cursor-pointer">
          <Plus className="w-4 h-4" /> Create New Automation Rule
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 text-xs font-medium overflow-x-auto">
        <button
          onClick={() => setActiveTab('workflows')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'workflows'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)]'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Sliders className="w-4 h-4 text-purple-400" /> Workflow Builder
        </button>

        <button
          onClick={() => setActiveTab('social_accounts')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'social_accounts'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)]'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Send className="w-4 h-4 text-cyan-400" /> Social Accounts
        </button>

        <button
          onClick={() => setActiveTab('scheduled_jobs')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'scheduled_jobs'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)]'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-400" /> Scheduled AI Jobs
        </button>

        <button
          onClick={() => setActiveTab('integrations')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'integrations'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)]'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Link className="w-4 h-4 text-emerald-400" /> CRM & App Integrations
        </button>

        <button
          onClick={() => setActiveTab('api_webhooks')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'api_webhooks'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)]'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Webhook className="w-4 h-4 text-cyan-400" /> Webhooks & API Center
        </button>
      </div>

      {/* TAB 1: Workflows */}
      {activeTab === 'workflows' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <Sliders className="w-4 h-4 text-purple-400" /> Active Rule-Based Automations ({workflows.length})
            </h3>
          </div>

          <div className="space-y-3">
            {workflows.map((wf) => (
              <div key={wf.id} className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl hover:border-purple-500/30 transition-all">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <h4 className="text-sm font-bold text-white">{wf.name}</h4>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${
                        wf.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-white/[0.05] text-slate-400 border-white/[0.08]'
                      }`}
                    >
                      {wf.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    <strong className="text-purple-400 font-mono">Trigger:</strong> {wf.trigger} → <strong className="text-cyan-400 font-mono">Action:</strong> {wf.action}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Last Run: {wf.lastRun} • Total Executions: {wf.executions}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button
                    onClick={() => toggleWorkflow(wf.id)}
                    className="px-3.5 py-1.5 bg-[#070b14] hover:bg-white/[0.06] border border-white/[0.08] rounded-xl text-xs font-bold text-slate-200 transition-colors font-mono cursor-pointer"
                  >
                    {wf.status === 'Active' ? 'Pause' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Social Accounts */}
      {activeTab === 'social_accounts' && (
        <div className="space-y-4">
          {/* Success/Error Messages */}
          {connectSuccess && (
            <div className="bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 p-4 rounded-xl text-xs font-bold flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              {connectSuccess}
            </div>
          )}
          {connectError && (
            <div className="bg-rose-600/20 border border-rose-500/40 text-rose-300 p-4 rounded-xl text-xs font-bold flex items-center gap-2 font-mono">
              <XCircle className="w-5 h-5 text-rose-400" />
              {connectError}
            </div>
          )}

          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <Send className="w-4 h-4 text-cyan-400" /> Connected Social Media Channels
            </h3>
            <button
              onClick={fetchSocialAccounts}
              className="px-3 py-1.5 bg-[#0b0f1b] hover:bg-white/[0.06] border border-white/[0.08] text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer font-mono"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingAccounts ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialAccounts.map((account) => (
              <div
                key={account.platform}
                className={`bg-[#0b0f1b]/90 border rounded-2xl p-5 space-y-3.5 shadow-xl transition-all ${
                  account.isConnected ? 'border-cyan-500/30' : 'border-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platformColors[account.platform]} flex items-center justify-center text-2xl shadow-lg`}>
                      {platformIcons[account.platform]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white capitalize">{account.platform}</h4>
                      {account.username && (
                        <span className="text-[11px] text-slate-400 font-mono">@{account.username}</span>
                      )}
                      {!account.username && account.isConnected && (
                        <span className="text-[11px] text-cyan-400 font-mono">Connected</span>
                      )}
                      {!account.isConnected && (
                        <span className="text-[11px] text-slate-500 font-mono">Not connected</span>
                      )}
                    </div>
                  </div>

                  {account.isConnected ? (
                    <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Active
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-white/[0.05] text-slate-400 border border-white/[0.08] text-[10px] font-bold font-mono">
                      Disconnected
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  {account.isConnected ? (
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <Database className="w-3.5 h-3.5 text-slate-500" />
                      User ID: {account.platformUserId || 'N/A'}
                    </span>
                  ) : (
                    <span className="text-[11px]">Click connect to link your {account.platform} account</span>
                  )}
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  {account.isConnected ? (
                    <button
                      onClick={() => handleDisconnect(account.platform)}
                      className="w-full py-2 bg-rose-500/10 hover:bg-rose-600/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 rounded-xl text-xs font-semibold font-mono transition-colors cursor-pointer"
                    >
                      Disconnect {account.platform}
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowTokenModal(account.platform)}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold font-mono transition-colors cursor-pointer"
                    >
                      Connect {account.platform}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Connect Modal */}
          {showTokenModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-[#0b0f1b] border border-white/[0.1] rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Connect {showTokenModal}
                </h3>
                <p className="text-xs text-slate-400">
                  Enter your {showTokenModal} credentials to connect your account.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-300 font-bold mb-1 font-mono">Access Token *</label>
                    <input
                      type="password"
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      placeholder="Enter your access token"
                      className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl px-3 py-2.5 text-white text-xs font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 font-bold mb-1 font-mono">Platform User/Page ID</label>
                    <input
                      type="text"
                      value={userIdInput}
                      onChange={(e) => setUserIdInput(e.target.value)}
                      placeholder="e.g., LinkedIn person URN, Twitter user ID"
                      className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl px-3 py-2.5 text-white text-xs font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 font-bold mb-1 font-mono">Username (optional)</label>
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="@username"
                      className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl px-3 py-2.5 text-white text-xs font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setShowTokenModal(null);
                      setTokenInput('');
                      setUserIdInput('');
                      setUsernameInput('');
                      setConnectError(null);
                    }}
                    className="flex-1 py-2.5 bg-[#070b14] hover:bg-white/[0.06] border border-white/[0.08] text-slate-300 rounded-xl text-xs font-semibold transition-colors font-mono cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConnect(showTokenModal)}
                    disabled={!tokenInput || connectingPlatform === showTokenModal}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold font-mono transition-colors cursor-pointer ${
                      connectingPlatform === showTokenModal
                        ? 'bg-purple-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]'
                    } text-white`}
                  >
                    {connectingPlatform === showTokenModal ? 'Connecting...' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Scheduled Jobs */}
      {activeTab === 'scheduled_jobs' && (
        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-3 font-mono">
            <Clock className="w-4 h-4 text-amber-400" /> Cron & Scheduled AI Agent Jobs
          </h3>

          <div className="space-y-3 text-xs">
            <div className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block text-sm">Weekly Competitor SWOT & Trend Radar</span>
                <span className="text-slate-400 font-mono text-[11px]">Schedule: Every Sunday at 11:00 PM UTC • Cron: 0 23 * * 0</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold font-mono">
                Scheduled
              </span>
            </div>

            <div className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block text-sm">Daily Social Engagement & Performance Analysis</span>
                <span className="text-slate-400 font-mono text-[11px]">Schedule: Everyday at 08:00 AM UTC • Cron: 0 8 * * *</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold font-mono">
                Scheduled
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Integrations */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
            <Link className="w-4 h-4 text-emerald-400" /> Enterprise Workspace & CRM Integrations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((item, idx) => (
              <div key={idx} className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-3.5 shadow-xl hover:border-emerald-500/30 transition-all">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{item.category}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Connected
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-mono bg-[#070b14] p-2.5 rounded-lg border border-white/[0.04] truncate">
                  {item.account}
                </p>

                <button className="w-full py-2 bg-[#070b14] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl text-xs font-semibold text-slate-300 transition-colors font-mono cursor-pointer">
                  Configure Settings
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: API & Webhooks */}
      {activeTab === 'api_webhooks' && (
        <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="border-b border-white/[0.06] pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <Webhook className="w-4 h-4 text-cyan-400" /> API Access Keys & Outbound Webhooks
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Programmatically trigger MarketMind AI content generation and receive event payloads in real time.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5 font-mono text-[11px] uppercase tracking-wider">Production API Token</label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  readOnly
                  value="marketmind_live_sec_991823748291048291048"
                  className="flex-1 bg-[#070b14] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-slate-400 font-mono"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('marketmind_live_sec_991823748291048291048');
                    setApiKeyCopied(true);
                    setTimeout(() => setApiKeyCopied(false), 2000);
                  }}
                  className="px-3.5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {apiKeyCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{apiKeyCopied ? 'Copied' : 'Copy Key'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5 font-mono text-[11px] uppercase tracking-wider">Active Outbound Webhook URL</label>
              <input
                type="text"
                readOnly
                value="https://api.marketmind.ai/v1/webhooks/content_events"
                className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-cyan-400 font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
