import React, { useState } from 'react';
import {
  LayoutDashboard,
  Bot,
  FileText,
  Search,
  Calendar,
  Sparkles,
  Image as ImageIcon,
  Video,
  TrendingUp,
  ShieldCheck,
  Send,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  Target,
  Sliders,
  Building,
  ChevronRight,
  ChevronLeft,
  Cpu,
  Zap,
  Briefcase,
  ListTodo,
  FolderKanban,
  Wrench,
  Layers,
  X,
} from 'lucide-react';
import { NavPage, UserRole } from '../types';

interface SidebarProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  userRole: UserRole;
  scheduledCount?: number;
  inReviewCount?: number;
  isMobileNavOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  userRole,
  scheduledCount = 2,
  inReviewCount = 1,
  isMobileNavOpen = false,
  onCloseMobile,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: {
    id: NavPage;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: number | string;
    category?: string;
    accentColor?: string;
  }[] = [
    // --- 1. CEO WORKSPACE & AI COMPANY OPERATING SYSTEM ---
    {
      id: 'ceo_workspace',
      label: 'CEO Workspace',
      icon: Briefcase,
      category: 'AI COMPANY OPERATING SYSTEM',
      badge: 'Orchestrator',
      accentColor: 'text-amber-400',
    },
    {
      id: 'tasks',
      label: 'Tasks Matrix',
      icon: ListTodo,
      category: 'AI COMPANY OPERATING SYSTEM',
      badge: inReviewCount > 0 ? `${inReviewCount} pending` : undefined,
      accentColor: 'text-cyan-400',
    },
    {
      id: 'agents',
      label: 'Agent Fleet',
      icon: Cpu,
      category: 'AI COMPANY OPERATING SYSTEM',
      badge: '8 Agents',
      accentColor: 'text-purple-400',
    },
    {
      id: 'tools',
      label: 'Tools & Integrations',
      icon: Wrench,
      category: 'AI COMPANY OPERATING SYSTEM',
      accentColor: 'text-emerald-400',
    },
    {
      id: 'projects',
      label: 'Enterprise Projects',
      icon: FolderKanban,
      category: 'AI COMPANY OPERATING SYSTEM',
      accentColor: 'text-indigo-400',
    },
    {
      id: 'analytics',
      label: 'Analytics & KPIs',
      icon: BarChart3,
      category: 'AI COMPANY OPERATING SYSTEM',
      accentColor: 'text-sky-400',
    },

    // --- 2. MARKETING AGENT EXECUTION HUB (Existing MarketMind Capabilities) ---
    {
      id: 'dashboard',
      label: 'Executive Overview',
      icon: LayoutDashboard,
      category: 'MARKETING AGENT ENGINE',
    },
    {
      id: 'command_center',
      label: 'AI Command Center',
      icon: Bot,
      badge: 'Live',
      category: 'MARKETING AGENT ENGINE',
      accentColor: 'text-cyan-400',
    },
    {
      id: 'weekly_brief',
      label: 'Strategy Briefing',
      icon: FileText,
      category: 'MARKETING AGENT ENGINE',
      badge: 'Weekly',
    },
    {
      id: 'research',
      label: 'Research & SWOT Radar',
      icon: Search,
      category: 'MARKETING AGENT ENGINE',
      accentColor: 'text-emerald-400',
    },
    {
      id: 'planner',
      label: 'Content Planner',
      icon: Calendar,
      category: 'MARKETING AGENT ENGINE',
    },
    {
      id: 'generator',
      label: 'Content Generator',
      icon: Sparkles,
      category: 'MARKETING AGENT ENGINE',
      badge: 'Multi-Channel',
      accentColor: 'text-pink-400',
    },
    {
      id: 'image_studio',
      label: 'Visual Studio',
      icon: ImageIcon,
      category: 'MARKETING AGENT ENGINE',
    },
    {
      id: 'video_studio',
      label: 'Video Hook Studio',
      icon: Video,
      category: 'MARKETING AGENT ENGINE',
    },
    {
      id: 'seo',
      label: 'SEO & GEO Center',
      icon: TrendingUp,
      category: 'MARKETING AGENT ENGINE',
      accentColor: 'text-teal-400',
    },
    {
      id: 'review',
      label: 'AI Review & Quality',
      icon: ShieldCheck,
      category: 'MARKETING AGENT ENGINE',
    },
    {
      id: 'publishing',
      label: 'Publishing Queue',
      icon: Send,
      category: 'MARKETING AGENT ENGINE',
      badge: scheduledCount > 0 ? scheduledCount : undefined,
    },
    {
      id: 'automation',
      label: 'Automation & Webhooks',
      icon: Sliders,
      category: 'MARKETING AGENT ENGINE',
    },

    // --- 3. SETTINGS & ACCESS ---
    {
      id: 'team',
      label: 'Team Workspace',
      icon: Users,
      category: 'ORGANIZATION SETTINGS',
    },
    {
      id: 'brand_settings',
      label: 'Brand & Digital Assets',
      icon: Settings,
      category: 'ORGANIZATION SETTINGS',
    },
    {
      id: 'enterprise',
      label: 'Enterprise & RBAC',
      icon: Building,
      category: 'ORGANIZATION SETTINGS',
    },
    {
      id: 'billing',
      label: 'Billing & Tokens',
      icon: CreditCard,
      category: 'ORGANIZATION SETTINGS',
    },
  ];

  let currentCategory = '';

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[#090d16] border-r border-white/[0.08] text-slate-300 flex flex-col h-screen select-none transition-transform duration-300 ease-in-out shrink-0
          lg:static lg:z-30 lg:translate-x-0
          ${isMobileNavOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          ${!isMobileNavOpen ? 'hidden lg:flex' : 'flex'}
        `}
      >
        {/* Brand Header */}
        <div className="p-3.5 border-b border-white/[0.08] flex items-center justify-between bg-[#06090f]/80 backdrop-blur-md">
          <div
            onClick={() => {
              onNavigate('ceo_workspace');
              onCloseMobile?.();
            }}
            className="flex items-center gap-2.5 cursor-pointer group min-w-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-lg shadow-indigo-600/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            {(!isCollapsed || isMobileNavOpen) && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-sm text-white tracking-tight truncate">
                    MarketMind
                  </h1>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                    AI
                  </span>
                </div>
                <p className="text-[9px] text-slate-400 font-medium tracking-wider uppercase truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AI Workforce OS
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Desktop Collapse Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const isCategoryStart = item.category && item.category !== currentCategory;
          if (isCategoryStart) {
            currentCategory = item.category!;
          }

          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <React.Fragment key={item.id}>
              {isCategoryStart && !isCollapsed && (
                <div className="pt-4 pb-1.5 px-2.5 text-[9px] font-bold tracking-widest text-slate-500 uppercase flex items-center justify-between">
                  <span>{item.category}</span>
                </div>
              )}
              {isCategoryStart && isCollapsed && (
                <div className="pt-3 pb-1 border-t border-white/[0.06] my-1" />
              )}
              <button
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile?.();
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center px-2' : 'justify-between px-3'
                } py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white font-bold border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-cyan-400' : item.accentColor || 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold shrink-0 ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer Profile Box */}
      {!isCollapsed && (
        <div className="p-3 border-t border-white/[0.08] bg-[#06090f]/60 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold font-mono">
              CEO
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Executive Admin</p>
              <p className="text-[10px] text-slate-400 truncate">Human-in-the-Loop</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Operational" />
        </div>
      )}
    </aside>
    </>
  );
};
