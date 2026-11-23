import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Link2,
  FileUp,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  User,
  Zap,
  Globe,
  FileText,
  X,
  Play,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  CheckCircle2,
  ChevronRight,
  Sliders,
  Calendar,
} from 'lucide-react';
import { BrandSettings, NavPage } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  agentId?: string;
  text: string;
  contextUrl?: string;
  fileName?: string;
  suggestedActions?: string[];
  timestamp: string;
  structuredData?: {
    overview?: string;
    strategy?: string[];
    recommendations?: string[];
    nextActions?: string[];
  };
}

interface AgentProfile {
  id: string;
  name: string;
  department: 'Marketing' | 'Sales' | 'Research' | 'Operations' | 'HR / Brand';
  deptColor: string;
  status: 'WORKING' | 'ACTIVE' | 'IDLE';
  statusColor: string;
  description: string;
  systemPrompt: string;
  suggestedPrompts: string[];
  icon: React.FC<{ className?: string }>;
}

interface AICommandCenterViewProps {
  brandSettings: BrandSettings;
  onNavigate: (page: NavPage) => void;
  onSavePostToQueue?: (post: any) => void;
}

export const AICommandCenterView: React.FC<AICommandCenterViewProps> = ({
  brandSettings,
  onNavigate,
  onSavePostToQueue,
}) => {
  const agents: AgentProfile[] = [
    {
      id: 'marketing_agent',
      name: 'Omni-Channel Content Agent',
      department: 'Marketing',
      deptColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      status: 'WORKING',
      statusColor: 'bg-cyan-400',
      description: 'Generates high-converting LinkedIn, X threads, and blog thought leadership.',
      systemPrompt: 'Senior Growth & Marketing Strategist specializing in B2B enterprise positioning.',
      suggestedPrompts: [
        'Draft 30-Day LinkedIn Executive Thought Leadership Plan',
        'Generate Viral Hook Angles for Product Launch',
        'Create Omni-Channel Campaign for Enterprise CTOs',
      ],
      icon: Sparkles,
    },
    {
      id: 'sales_agent',
      name: 'B2B Growth & Outbound Agent',
      department: 'Sales',
      deptColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      status: 'ACTIVE',
      statusColor: 'bg-emerald-400',
      description: 'Architects executive outbound sequences and demo conversion funnels.',
      systemPrompt: 'B2B Enterprise Sales Director focusing on pipeline acceleration and high ACV deals.',
      suggestedPrompts: [
        'Draft 3-Step Cold Email Sequence for Enterprise IT Leaders',
        'Generate ROI Calculator Script for Sales Demos',
        'Analyze Objections to Cloud Infrastructure Modernization',
      ],
      icon: Send,
    },
    {
      id: 'research_agent',
      name: 'Market Intelligence & SWOT Radar',
      department: 'Research',
      deptColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      status: 'ACTIVE',
      statusColor: 'bg-emerald-400',
      description: 'Conducts live web grounding, competitor intelligence, and market gap audits.',
      systemPrompt: 'Autonomous Market Research Analyst utilizing real-time Google search grounding.',
      suggestedPrompts: [
        'Audit Competitor Strategy & Pricing Weaknesses',
        'Detect Emerging GEO Search Trends in Enterprise Cloud',
        'Generate 4-Quadrant Market Positioning Matrix',
      ],
      icon: Globe,
    },
    {
      id: 'operations_agent',
      name: 'SEO & Generative Engine (GEO)',
      department: 'Operations',
      deptColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      status: 'IDLE',
      statusColor: 'bg-slate-500',
      description: 'Optimizes structured schemas and high-intent keyword clustering.',
      systemPrompt: 'Technical SEO Architect specializing in Generative Engine Optimization (GEO).',
      suggestedPrompts: [
        'Generate FAQ Schema & High-Intent Keywords for GEO',
        'Analyze SERP Rank Gaps for Financial Cloud Services',
        'Cluster 20 Long-Tail Keywords for Q3 Editorial Calendar',
      ],
      icon: TrendingUp,
    },
    {
      id: 'compliance_agent',
      name: 'Brand Compliance & Reviewer',
      department: 'HR / Brand',
      deptColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      status: 'WORKING',
      statusColor: 'bg-cyan-400',
      description: 'Ensures 100% adherence to brand voice, forbidden terms, and tone.',
      systemPrompt: 'Enterprise Brand Governance and Regulatory Compliance Officer.',
      suggestedPrompts: [
        'Audit Content Draft against Brand Voice Pillars',
        'Check Tone Consistency and Forbidden Keyword List',
        'Generate Executive Style Guide Summary',
      ],
      icon: ShieldCheck,
    },
  ];

  const [selectedAgentId, setSelectedAgentId] = useState<string>('marketing_agent');
  const activeAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      agentId: 'marketing_agent',
      text: `Hello! I am your **${activeAgent.name}** operating within the **${activeAgent.department}** department.\n\nI have loaded the active context for **${brandSettings.brandName}** (${brandSettings.tone} Tone).\n\nHow can I accelerate your autonomous marketing pipeline today?`,
      timestamp: 'Just now',
      suggestedActions: [
        'Audit Competitor Strategy',
        'Draft 30-Day Content Plan',
        'Analyze Target Market Trends',
        'Generate Video Hook Angles',
      ],
      structuredData: {
        overview: `Ready to orchestrate campaigns for ${brandSettings.brandName} across LinkedIn, X, Blogs, and Email channels.`,
        strategy: [
          'Grounded with real-time enterprise market intelligence',
          `Maintains strict ${brandSettings.tone} tone and brand pillars`,
          'One-click export directly to Publishing Queue & Planner',
        ],
        nextActions: ['Select a suggested prompt below or type your custom instruction.'],
      },
    },
  ]);

  const [promptInput, setPromptInput] = useState('');
  const [contextUrl, setContextUrl] = useState('');
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [documentText, setDocumentText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Voice Toggle
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported natively in this browser window. Simulating voice prompt...');
      setIsListening(true);
      setTimeout(() => {
        setPromptInput('Create a 30-day LinkedIn thought leadership campaign for enterprise CTOs.');
        setIsListening(false);
      }, 2000);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setPromptInput((prev) => (prev ? prev + ' ' + transcript : transcript));
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  // Handle Document Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setDocumentText(text || `Content extracted from ${file.name}`);
    };
    reader.readAsText(file);
  };

  // Handle Send Command
  const handleSendMessage = async (customPrompt?: string) => {
    const queryPrompt = customPrompt || promptInput;
    if (!queryPrompt.trim() && !contextUrl && !documentText) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryPrompt,
      contextUrl: contextUrl || undefined,
      fileName: fileName || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setPromptInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryPrompt,
          contextUrl: contextUrl || undefined,
          documentText: documentText || undefined,
          brandInfo: brandSettings,
          agentRole: activeAgent.systemPrompt,
        }),
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        agentId: activeAgent.id,
        text: data.reply || 'Strategy execution completed.',
        suggestedActions: data.suggestedActions || ['Schedule in Planner', 'Send to Review Center', 'Generate Visuals'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        structuredData: {
          overview: `Processed by ${activeAgent.name} for ${brandSettings.brandName}.`,
          strategy: [
            'Target high-intent B2B decision makers with authoritative proof points.',
            'Deploy across LinkedIn and Twitter/X with synchronized cadence.',
          ],
          recommendations: [
            'A/B test the first hook angle with interactive question format.',
            'Attach branded carousel asset to maximize dwell time.',
          ],
          nextActions: ['Click "Schedule in Planner" to queue this post immediately.'],
        },
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Command failed:', error);
      const fallbackMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        agentId: activeAgent.id,
        text: `### 🎯 Strategic Output for: "${queryPrompt}"\n\n**Agent:** ${activeAgent.name} (${activeAgent.department})\n\n1. **Core Angle:** Position **${brandSettings.brandName}** with high-authority technical insights.\n2. **Distribution Blueprint:** Publish across LinkedIn and Twitter with data-backed infographics.\n3. **Conversion Call to Action:** "Request a 15-minute architecture review."`,
        suggestedActions: ['Schedule in Planner', 'Generate Visuals', 'Competitor SWOT Radar'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        structuredData: {
          overview: `Automated strategy generated by ${activeAgent.name}.`,
          strategy: ['Grounded in enterprise market benchmarks', `Tone: ${brandSettings.tone}`],
          recommendations: ['Maintain weekly consistency', 'Incorporate customer case metrics'],
          nextActions: ['Export to Content Planner or send to AI Review Center.'],
        },
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePushToQueue = (msgText: string) => {
    if (onSavePostToQueue) {
      onSavePostToQueue({
        title: `AI Output: ${activeAgent.name}`,
        channel: 'linkedin',
        content: msgText,
        status: 'scheduled',
        scheduledAt: new Date(Date.now() + 86400000).toISOString(),
        author: 'Autonomous AI Agent',
      });
    } else {
      onNavigate('planner');
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)] space-y-4">
      {/* Top Multi-Agent Selector Bar */}
      <div className="bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-xl shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar py-1">
          {agents.map((ag) => {
            const Icon = ag.icon;
            const isSelected = selectedAgentId === ag.id;
            return (
              <button
                key={ag.id}
                onClick={() => setSelectedAgentId(ag.id)}
                className={`px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all whitespace-nowrap text-xs ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600/30 via-purple-600/20 to-cyan-600/20 border border-indigo-500/50 text-white font-bold shadow-md shadow-indigo-600/10'
                    : 'bg-[#070b14] border border-white/[0.06] text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate max-w-[130px] font-semibold">{ag.name}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${ag.statusColor} ${ag.status === 'WORKING' ? 'animate-pulse' : ''}`} />
                  </div>
                  <span className="text-[9px] text-slate-400 block">{ag.department}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Context Indicators */}
        <div className="flex items-center gap-2 shrink-0">
          {contextUrl && (
            <span className="text-[11px] bg-[#070b14] border border-cyan-500/30 text-cyan-300 px-2.5 py-1 rounded-lg flex items-center gap-1 max-w-[180px] truncate">
              <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{contextUrl}</span>
              <X className="w-3 h-3 text-slate-500 hover:text-white cursor-pointer ml-1 shrink-0" onClick={() => setContextUrl('')} />
            </span>
          )}
          {fileName && (
            <span className="text-[11px] bg-[#070b14] border border-emerald-500/30 text-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1 max-w-[180px] truncate">
              <FileText className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">{fileName}</span>
              <X className="w-3 h-3 text-slate-500 hover:text-white cursor-pointer ml-1 shrink-0" onClick={() => { setFileName(''); setDocumentText(''); }} />
            </span>
          )}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* Center / Chat Stream Area */}
        <div className="lg:col-span-9 flex flex-col bg-[#0b0f1b] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl min-h-0">
          {/* Active Agent Sub-Header */}
          <div className="p-3.5 bg-[#080c16]/90 border-b border-white/[0.08] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-xs truncate">{activeAgent.name}</h4>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase ${activeAgent.deptColor}`}>
                    {activeAgent.department}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">
                  Brand: <span className="text-slate-200 font-medium">{brandSettings.brandName}</span> • Tone: <span className="text-cyan-400">{brandSettings.tone}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[10px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Status: {activeAgent.status}</span>
              </span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-[#070a14]/60">
            {messages.map((m) => {
              const isAssistant = m.sender === 'assistant';
              return (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-3xl ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                      isAssistant
                        ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {isAssistant ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div
                    className={`rounded-2xl p-4 space-y-3 text-xs leading-relaxed max-w-full ${
                      isAssistant
                        ? 'bg-[#0b0f1b] border border-white/[0.08] text-slate-200 shadow-xl'
                        : 'bg-indigo-600 text-white shadow-lg'
                    }`}
                  >
                    {m.contextUrl && (
                      <div className="flex items-center gap-1.5 text-[10px] text-cyan-300 bg-cyan-950/40 p-1.5 rounded-lg border border-cyan-800/40">
                        <Globe className="w-3 h-3" /> Grounded Context: {m.contextUrl}
                      </div>
                    )}
                    {m.fileName && (
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-300 bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-800/40">
                        <FileText className="w-3 h-3" /> File Attachment: {m.fileName}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap font-normal">{m.text}</div>

                    {/* Structured AI Results Panel if available */}
                    {isAssistant && m.structuredData && (
                      <div className="mt-3 p-3 rounded-xl bg-[#060912] border border-white/[0.06] space-y-2 text-[11px]">
                        {m.structuredData.overview && (
                          <div>
                            <span className="font-bold text-cyan-400 uppercase text-[9px] tracking-wider block">Overview</span>
                            <p className="text-slate-300 mt-0.5">{m.structuredData.overview}</p>
                          </div>
                        )}

                        {m.structuredData.strategy && m.structuredData.strategy.length > 0 && (
                          <div className="pt-1.5 border-t border-white/[0.04]">
                            <span className="font-bold text-purple-400 uppercase text-[9px] tracking-wider block">Key Strategic Pillars</span>
                            <ul className="list-disc list-inside text-slate-300 space-y-0.5 mt-0.5">
                              {m.structuredData.strategy.map((st, sIdx) => (
                                <li key={sIdx}>{st}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {isAssistant && (
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06]">
                        <span className="text-[10px] text-slate-500">{m.timestamp}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(m.text, m.id)}
                            className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 bg-white/[0.04] px-2 py-1 rounded-lg border border-white/[0.06]"
                          >
                            {copiedId === m.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Copy Strategy
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handlePushToQueue(m.text)}
                            className="text-[10px] text-cyan-300 hover:text-white flex items-center gap-1 bg-cyan-600/20 hover:bg-cyan-600 px-2 py-1 rounded-lg border border-cyan-500/30 transition-all font-semibold"
                          >
                            <Calendar className="w-3 h-3" /> Add to Queue
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Suggested Action Buttons */}
                    {m.suggestedActions && m.suggestedActions.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5 border-t border-white/[0.06]">
                        {m.suggestedActions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (act.toLowerCase().includes('generator') || act.toLowerCase().includes('post') || act.toLowerCase().includes('content')) {
                                onNavigate('generator');
                              } else if (act.toLowerCase().includes('radar') || act.toLowerCase().includes('swot') || act.toLowerCase().includes('research')) {
                                onNavigate('research');
                              } else if (act.toLowerCase().includes('review')) {
                                onNavigate('review');
                              } else if (act.toLowerCase().includes('planner') || act.toLowerCase().includes('queue')) {
                                onNavigate('planner');
                              } else {
                                handleSendMessage(act);
                              }
                            }}
                            className="text-[10px] bg-[#070b14] hover:bg-indigo-950/40 border border-white/[0.08] hover:border-indigo-500/40 text-cyan-300 hover:text-white px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all"
                          >
                            <Zap className="w-3 h-3 text-amber-400" />
                            <span>{act}</span>
                            <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 max-w-3xl mr-auto items-center text-xs text-cyan-400 p-3 bg-[#0b0f1b] border border-cyan-500/30 rounded-2xl">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span className="font-semibold">{activeAgent.name} analyzing context and executing autonomous task...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#080c16] border-t border-white/[0.08] space-y-2 shrink-0">
            {/* URL Modal Input */}
            {showUrlModal && (
              <div className="p-2.5 bg-[#070a14] border border-white/[0.1] rounded-xl flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Paste URL (e.g. competitor blog, landing page, market report)..."
                  value={contextUrl}
                  onChange={(e) => setContextUrl(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-slate-200 focus:outline-none placeholder-slate-500"
                />
                <button
                  onClick={() => setShowUrlModal(false)}
                  className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold"
                >
                  Attach Context
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              {/* File Upload Button */}
              <label className="p-2 bg-[#0c101c] hover:bg-slate-800 border border-white/[0.08] text-slate-400 hover:text-slate-200 rounded-xl cursor-pointer transition-colors shrink-0">
                <FileUp className="w-4 h-4" />
                <input type="file" accept=".txt,.md,.doc,.json,.pdf" className="hidden" onChange={handleFileUpload} />
              </label>

              {/* URL Attach Button */}
              <button
                onClick={() => setShowUrlModal(!showUrlModal)}
                className={`p-2 rounded-xl border transition-colors shrink-0 ${
                  contextUrl
                    ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-[#0c101c] hover:bg-slate-800 border-white/[0.08] text-slate-400 hover:text-slate-200'
                }`}
                title="Attach URL for Live Search Grounding"
              >
                <Link2 className="w-4 h-4" />
              </button>

              {/* Mic Voice Button */}
              <button
                onClick={toggleVoiceInput}
                className={`p-2 rounded-xl border transition-all shrink-0 ${
                  isListening
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                    : 'bg-[#0c101c] hover:bg-slate-800 border-white/[0.08] text-slate-400 hover:text-slate-200'
                }`}
                title="Voice Command Toggle"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Prompt Input */}
              <input
                type="text"
                placeholder={
                  isListening
                    ? 'Listening to voice command...'
                    : `Instruct ${activeAgent.name} (e.g. "Draft 30-day campaign for CTOs")...`
                }
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1 bg-[#0c101c] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
              />

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || (!promptInput.trim() && !contextUrl && !documentText)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:opacity-90 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all shrink-0 active:scale-95"
              >
                <span>Execute</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Panel: Agent Intelligence Tray */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-3.5 min-h-0 overflow-y-auto custom-scrollbar">
          {/* Agent Spec Card */}
          <div className="bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Agent Parameters
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                Gemini 3.6
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Department</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border uppercase inline-block mt-0.5 ${activeAgent.deptColor}`}>
                  {activeAgent.department}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Core Directive</span>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{activeAgent.systemPrompt}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Active Brand Voice</span>
                <p className="text-[11px] text-cyan-300 font-medium mt-0.5">{brandSettings.brandName} • {brandSettings.tone}</p>
              </div>
            </div>
          </div>

          {/* Quick Prompts for Selected Agent */}
          <div className="bg-[#0b0f1b] border border-white/[0.08] rounded-2xl p-4 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-white/[0.08] pb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Quick Agent Prompts
            </span>

            <div className="space-y-2">
              {activeAgent.suggestedPrompts.map((pr, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(pr)}
                  className="w-full text-left p-2.5 rounded-xl bg-[#070b14] hover:bg-white/[0.04] border border-white/[0.06] text-[11px] text-slate-300 hover:text-white transition-all group flex items-start justify-between gap-1.5"
                >
                  <span className="line-clamp-2">{pr}</span>
                  <ArrowRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

