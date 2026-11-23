import React, { useState } from 'react';
import {
  Target,
  Sparkles,
  Users,
  Filter,
  Repeat,
  BookOpen,
  Database,
  Bot,
  Layers,
  ArrowRight,
  Plus,
  Search,
  CheckCircle2,
  FileText,
  Zap,
  Clock,
  Briefcase,
  ChevronRight,
  Cpu,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { BrandSettings, PageId } from '../types';

interface AIStrategyHubViewProps {
  brandSettings: BrandSettings;
  onNavigate: (page: PageId) => void;
  onGenerateCampaign: (topic: string) => void;
}

export const AIStrategyHubView: React.FC<AIStrategyHubViewProps> = ({
  brandSettings,
  onNavigate,
  onGenerateCampaign,
}) => {
  const [activeTab, setActiveTab] = useState<
    'agents' | 'campaign_builder' | 'gtm' | 'personas' | 'funnel' | 'prompts' | 'knowledge_base'
  >('agents');

  // Campaign Builder State
  const [campaignName, setCampaignName] = useState('MarketMind Cloud Enterprise Launch Q3');
  const [targetGoal, setTargetGoal] = useState('Lead Generation & Enterprise Demos');
  const [targetAudience, setTargetAudience] = useState(brandSettings.targetAudience);
  const [campaignOutput, setCampaignOutput] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Personas State
  const personas = [
    {
      name: 'Elena Rostova',
      role: 'Chief Technology Officer (CTO)',
      companySize: '250 - 1,000 Employees',
      painPoints: ['Legacy monolithic bottlenecks', 'High cloud egress costs', 'Compliance and data sovereignty'],
      goals: ['Modernize tech stack with microservices', 'Seamless multi-cloud deployment', 'AI-driven operations'],
      preferredChannels: ['LinkedIn', 'Tech Conferences', 'Gartner Reports'],
    },
    {
      name: 'David Chen',
      role: 'VP of Digital Transformation',
      companySize: '1,000+ Employees',
      painPoints: ['Slow time-to-market', 'Siloed IT & business teams', 'Security approval friction'],
      goals: ['Automate business workflows', 'Integrate enterprise AI assistants', 'Measurable ROI in 90 days'],
      preferredChannels: ['Executive Newsletters', 'Industry Webinars', 'Direct Consultations'],
    },
  ];

  // AI Prompt Library
  const promptLibrary = [
    { title: 'GTM Positioning Matrix', category: 'Strategy', prompt: `Act as a Senior B2B Tech Strategist. Analyze ${brandSettings.brandName} enterprise solutions and generate a 4-quadrant positioning matrix vs competitors.` },
    { title: 'High-Converting LinkedIn Thought Leadership', category: 'Social', prompt: `Write a 250-word LinkedIn post for ${brandSettings.brandName} on Cloud Modernization with 3 actionable takeaways and an executive CTA.` },
    { title: 'Enterprise Cold Outreach Sequence', category: 'Email', prompt: 'Draft a 3-step cold email sequence targeting CTOs focusing on AI-driven IT cost reduction.' },
    { title: 'SEO Pillar Article Outline', category: 'SEO', prompt: 'Create a comprehensive 2,000-word article outline on "Next-Gen Cloud Architecture for Financial Services".' },
  ];

  // Knowledge Base Docs
  const knowledgeDocs = [
    { title: `${brandSettings.brandName}_Enterprise_Services_Whitepaper_2026.pdf`, size: '2.4 MB', status: 'Indexed', chunkCount: 142 },
    { title: 'Brand_Voice_Identity_Guidelines.pdf', size: '1.1 MB', status: 'Indexed', chunkCount: 56 },
    { title: 'Competitor_SWOT_Analysis_Q2.docx', size: '840 KB', status: 'Indexed', chunkCount: 38 },
  ];

  // AI Agent Fleet Marketplace
  const agents = [
    {
      id: 'marketing_agent',
      name: 'Omni-Channel Content Agent',
      department: 'Marketing',
      deptColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      status: 'WORKING',
      statusColor: 'bg-cyan-400',
      desc: 'Generates high-converting LinkedIn, X threads, and blog thought leadership.',
      runsThisMonth: 512,
      latency: '1.2s',
      successRate: '99.4%',
    },
    {
      id: 'sales_agent',
      name: 'B2B Growth & Outbound Agent',
      department: 'Sales',
      deptColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      status: 'ACTIVE',
      statusColor: 'bg-emerald-400',
      desc: 'Architects executive cold sequences and demo conversion funnels.',
      runsThisMonth: 210,
      latency: '1.4s',
      successRate: '98.8%',
    },
    {
      id: 'research_agent',
      name: 'Market Intelligence & SWOT Radar',
      department: 'Research',
      deptColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      status: 'ACTIVE',
      statusColor: 'bg-emerald-400',
      desc: 'Conducts live web grounding, competitor intelligence, and market gap audits.',
      runsThisMonth: 128,
      latency: '2.1s',
      successRate: '99.1%',
    },
    {
      id: 'operations_agent',
      name: 'SEO & Generative Engine (GEO)',
      department: 'Operations',
      deptColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      status: 'IDLE',
      statusColor: 'bg-slate-500',
      desc: 'Optimizes structured schemas and high-intent keyword clustering.',
      runsThisMonth: 342,
      latency: '1.1s',
      successRate: '99.7%',
    },
  ];

  const handleRunCampaignBuilder = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setCampaignOutput(`
### 🚀 ${brandSettings.brandName} GTM Campaign Strategy: ${campaignName}

**Goal:** ${targetGoal}
**Primary Persona:** CTOs & Enterprise IT Leaders

#### 1. Positioning & Core Value Narrative
"${brandSettings.valueProposition || `${brandSettings.brandName} redefines enterprise tech with self-healing cloud architecture and native AI workflow automation — reducing IT complexity by 40%.`}"

#### 2. Multi-Channel Content Blueprint
- **LinkedIn (Top of Funnel):** Executive thought leadership on cloud egress cost containment.
- **Whitepaper / Lead Magnet:** "The 2026 Enterprise Cloud Architecture Benchmark Report".
- **Email Nurture (Middle of Funnel):** 3-part case study sequence showing 3.2x ROI.
- **Demo Landing Page (Bottom of Funnel):** Interactive Cloud ROI Calculator & 15-min Architecture Review.

#### 3. Recommended Execution Timeline
- **Week 1-2:** Teaser posts & Research whitepaper launch.
- **Week 3-4:** Target cold outreach & Retargeting ad campaign.
      `);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="p-5 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0b1022] via-[#0e142a] to-[#120d26] p-6 rounded-2xl border border-white/[0.08] shadow-2xl text-white">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
              Autonomous Intelligence Engine
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight mt-1.5 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" /> AI Agent Fleet & GTM Strategy Hub
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Department-based agent workspaces, GTM campaign modeling, buyer personas, and RAG knowledge base.
          </p>
        </div>

        <button
          onClick={() => onNavigate('command_center')}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:opacity-90 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto"
        >
          <Bot className="w-4 h-4" /> Open Command Center
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/[0.08] text-xs font-medium custom-scrollbar">
        <button
          onClick={() => setActiveTab('agents')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'agents'
              ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/20'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Bot className="w-4 h-4 text-cyan-400" /> Agent Fleet ({agents.length})
        </button>

        <button
          onClick={() => setActiveTab('campaign_builder')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'campaign_builder'
              ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/20'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Target className="w-4 h-4 text-indigo-400" /> Campaign Builder
        </button>

        <button
          onClick={() => setActiveTab('gtm')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'gtm'
              ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/20'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Briefcase className="w-4 h-4 text-emerald-400" /> GTM & Positioning
        </button>

        <button
          onClick={() => setActiveTab('personas')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'personas'
              ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/20'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Users className="w-4 h-4 text-purple-400" /> Buyer Personas
        </button>

        <button
          onClick={() => setActiveTab('prompts')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'prompts'
              ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/20'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-pink-400" /> Prompt Library
        </button>

        <button
          onClick={() => setActiveTab('knowledge_base')}
          className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'knowledge_base'
              ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/20'
              : 'bg-[#0b0f1b] text-slate-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Database className="w-4 h-4 text-teal-400" /> RAG Knowledge Base
        </button>
      </div>

      {/* TAB: Agent Fleet Marketplace */}
      {activeTab === 'agents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> Department-Based Autonomous AI Agents
            </h3>
            <span className="text-xs text-slate-400">Model: Gemini 3.6 Flash</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((ag) => (
              <div
                key={ag.id}
                className="bg-[#0b0f1b] border border-white/[0.08] hover:border-cyan-500/40 rounded-2xl p-5 space-y-4 shadow-xl transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 flex items-center justify-center text-white shadow-md">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {ag.name}
                        </h4>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider inline-block mt-0.5 ${ag.deptColor}`}>
                          {ag.department}
                        </span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-white/[0.08] text-[10px] font-bold text-slate-300 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${ag.statusColor} ${ag.status === 'WORKING' ? 'animate-pulse' : ''}`} />
                      {ag.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{ag.desc}</p>

                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="p-2 rounded-xl bg-[#070b14] border border-white/[0.05]">
                      <span className="text-[10px] text-slate-500 block font-semibold">Monthly Runs</span>
                      <span className="text-xs font-bold text-slate-200">{ag.runsThisMonth}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#070b14] border border-white/[0.05]">
                      <span className="text-[10px] text-slate-500 block font-semibold">Latency</span>
                      <span className="text-xs font-bold text-cyan-400">{ag.latency}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#070b14] border border-white/[0.05]">
                      <span className="text-[10px] text-slate-500 block font-semibold">Success</span>
                      <span className="text-xs font-bold text-emerald-400">{ag.successRate}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onNavigate('command_center')}
                    className="w-full py-2 bg-[#070b14] hover:bg-cyan-600/20 border border-white/[0.08] hover:border-cyan-500/40 rounded-xl text-xs font-bold text-cyan-300 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Command Agent in Chat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Campaign Builder */}
      {activeTab === 'campaign_builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <Target className="w-4 h-4 text-cyan-400" /> Configure Campaign Parameters
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Campaign Title</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Primary Campaign Goal</label>
                <select
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Lead Generation & Enterprise Demos">Lead Generation & Enterprise Demos</option>
                  <option value="Brand Positioning & Thought Leadership">Brand Positioning & Thought Leadership</option>
                  <option value="Product Launch & Feature Announcement">Product Launch & Feature Announcement</option>
                  <option value="Customer Retention & Upsell">Customer Retention & Upsell</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Audience Profile</label>
                <textarea
                  rows={3}
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-[#070b14] border border-white/[0.08] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                onClick={handleRunCampaignBuilder}
                disabled={isGenerating}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:opacity-90 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Architecting Campaign Blueprint...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Campaign Strategy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" /> Generated Campaign Blueprint
              </h3>
              {campaignOutput && (
                <button
                  onClick={() => onGenerateCampaign(campaignName)}
                  className="text-xs px-3 py-1 bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/30 rounded-lg font-bold transition-all flex items-center gap-1"
                >
                  Create Posts in Studio →
                </button>
              )}
            </div>

            {campaignOutput ? (
              <div className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4 text-xs text-slate-200 whitespace-pre-line leading-relaxed font-mono">
                {campaignOutput}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-[#070b14]/50 rounded-xl border border-dashed border-white/[0.08] text-slate-500 space-y-2">
                <Target className="w-8 h-8 text-slate-700" />
                <p className="text-xs font-semibold text-slate-400">No campaign generated yet.</p>
                <p className="text-[11px] text-slate-500 max-w-sm">
                  Configure the parameters on the left and trigger the AI Architect.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: GTM & Positioning */}
      {activeTab === 'gtm' && (
        <div className="bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" /> Go-To-Market Positioning Framework
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Competitive differentiation, key messaging pillars, and elevator pitch formulations for {brandSettings.brandName}.
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold">
              Brand Voice Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Pillar 1: Technology Redefined</span>
              <h4 className="text-sm font-bold text-white">Autonomous Cloud & AI Workflows</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Position {brandSettings.brandName} as the modern AI infrastructure alternative to slow, disconnected point solutions.
              </p>
            </div>

            <div className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Pillar 2: Enterprise Trust</span>
              <h4 className="text-sm font-bold text-white">Security & Zero-Trust Architecture</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empower financial and healthcare enterprises with strict compliance, RBAC, and dedicated encryption.
              </p>
            </div>

            <div className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Pillar 3: Measurable ROI</span>
              <h4 className="text-sm font-bold text-white">Automated Operations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drive up to 40% operational efficiency with automated workflow orchestration and multi-agent synergy.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Personas */}
      {activeTab === 'personas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" /> Modeled Buyer Personas ({personas.length})
            </h3>
            <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all">
              <Plus className="w-3.5 h-3.5" /> Generate New Persona
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personas.map((p, idx) => (
              <div key={idx} className="bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white">{p.name}</h4>
                    <p className="text-xs text-purple-400 font-semibold">{p.role} • {p.companySize}</p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-xs border border-purple-500/30">
                    {p.name.charAt(0)}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Core Pain Points</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5 mt-1">
                      {p.painPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">Strategic Goals</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5 mt-1">
                      {p.goals.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Prompts */}
      {activeTab === 'prompts' && (
        <div className="bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.08] pb-3">
            <BookOpen className="w-4 h-4 text-pink-400" /> Enterprise Prompt Library
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {promptLibrary.map((pr, i) => (
              <div key={i} className="bg-[#070b14] border border-white/[0.06] rounded-xl p-4 space-y-2 hover:border-pink-500/40 transition-all">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{pr.title}</span>
                  <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 text-[10px] font-bold border border-pink-500/30">
                    {pr.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono bg-[#0c101c] p-2.5 rounded-lg border border-white/[0.06]">
                  {pr.prompt}
                </p>
                <button
                  onClick={() => onGenerateCampaign(pr.prompt)}
                  className="text-[11px] font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1"
                >
                  Use in Content Studio →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Knowledge Base */}
      {activeTab === 'knowledge_base' && (
        <div className="bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" /> RAG Knowledge Base Document Index
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Indexed PDFs, whitepapers, and specs for grounded AI content generation.
              </p>
            </div>
            <button className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Upload Document
            </button>
          </div>

          <div className="space-y-2">
            {knowledgeDocs.map((doc, idx) => (
              <div key={idx} className="bg-[#070b14] border border-white/[0.06] rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="font-bold text-white block">{doc.title}</span>
                    <span className="text-[10px] text-slate-400">{doc.size} • {doc.chunkCount} Vector Chunks</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

