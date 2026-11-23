import React, { useState, useEffect } from 'react';
import { Briefcase, ListTodo, Cpu, Sparkles, Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CeoWorkspaceView } from './components/CeoWorkspaceView';
import { TasksManagementView } from './components/TasksManagementView';
import { AgentsRegistryView } from './components/AgentsRegistryView';
import { ToolsManagementView } from './components/ToolsManagementView';
import { ProjectsManagementView } from './components/ProjectsManagementView';
import { AnalyticsDashboardView } from './components/AnalyticsDashboardView';
import { DashboardView } from './components/DashboardView';
import { AICommandCenterView } from './components/AICommandCenterView';
import { WeeklyBriefView } from './components/WeeklyBriefView';
import { AIStrategyHubView } from './components/AIStrategyHubView';
import { ResearchCenterView } from './components/ResearchCenterView';
import { ContentPlannerView } from './components/ContentPlannerView';
import { ContentGeneratorView } from './components/ContentGeneratorView';
import { ImageStudioView } from './components/ImageStudioView';
import { VideoStudioView } from './components/VideoStudioView';
import { SEOCenterView } from './components/SEOCenterView';
import { AIReviewCenterView } from './components/AIReviewCenterView';
import { PublishingCenterView } from './components/PublishingCenterView';
import { AutomationIntegrationsView } from './components/AutomationIntegrationsView';
import { TeamWorkspaceView } from './components/TeamWorkspaceView';
import { BrandSettingsView } from './components/BrandSettingsView';
import { EnterpriseView } from './components/EnterpriseView';
import { BillingView } from './components/BillingView';
import { CreatePostModal } from './components/CreatePostModal';
import { AuthView } from './components/AuthView';

import {
  NavPage,
  UserRole,
  AuthUser,
  PostItem,
  BrandSettings,
  CompetitorItem,
  TrendItem,
  TeamMember,
  PostStatus,
} from './types';

import {
  initialPosts,
  initialBrandSettings,
  initialWeeklyBrief,
  initialCompetitors,
  initialTrends,
  initialTeamMembers,
  initialCampaigns,
  initialAnalytics,
} from './data/initialData';

export function App() {
  const [activePage, setActivePage] = useState<NavPage>('ceo_workspace');
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Auth & Session State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: 'user-admin',
    name: 'Executive Admin',
    email: 'admin@marketmind.ai',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    organization: 'Shuroq Enterprise',
  });
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Check session on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('Not authenticated');
        })
        .then((data) => {
          setCurrentUser(data.user);
          setUserRole(data.user.role);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // Keep current fallback admin
        });
    }
  }, []);

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    setUserRole(user.role);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('auth_token');
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch {
      // ignore
    }
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (currentUser) {
      setCurrentUser({ ...currentUser, role });
    }
  };

  // Application State (Marketing Engine)
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(initialBrandSettings);
  const [weeklyBrief, setWeeklyBrief] = useState(initialWeeklyBrief);
  const [competitors, setCompetitors] = useState<CompetitorItem[]>(initialCompetitors);
  const [trends, setTrends] = useState<TrendItem[]>(initialTrends);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [analytics, setAnalytics] = useState(initialAnalytics);

  // Modal & Pre-fill State
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<PostItem> | undefined>(undefined);
  const [generatorTopic, setGeneratorTopic] = useState<string>('');

  // Handlers
  const handleCreatePostSave = (postData: Partial<PostItem>) => {
    const newPost: PostItem = {
      id: editingPost?.id || `post-${Date.now()}`,
      title: postData.title || 'Untitled Campaign Post',
      channel: postData.channel || 'linkedin',
      content: postData.content || '',
      status: postData.status || 'scheduled',
      scheduledAt: postData.scheduledAt,
      author: postData.author || 'Alex Rivera',
      tags: ['#AI', '#Marketing'],
    };

    if (editingPost?.id) {
      setPosts((prev) => prev.map((p) => (p.id === editingPost.id ? { ...p, ...newPost } : p)));
    } else {
      setPosts((prev) => [newPost, ...prev]);
    }

    setEditingPost(undefined);
  };

  const handleUpdatePostStatus = (postId: string, newStatus: PostStatus) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isPublished = newStatus === 'published';
          return {
            ...p,
            status: newStatus,
            publishedAt: isPublished ? new Date().toISOString() : p.publishedAt,
          };
        }
        return p;
      })
    );
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handleGenerateTopicClick = (topicStr: string) => {
    setGeneratorTopic(topicStr);
    setActivePage('generator');
  };

  const handleAddCompetitor = (newComp: CompetitorItem) => {
    setCompetitors((prev) => [newComp, ...prev]);
  };

  const handleInviteMember = (newMember: TeamMember) => {
    setTeamMembers((prev) => [...prev, newMember]);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading MarketMind OS...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Header */}
      <Header
        activePage={activePage}
        userRole={userRole}
        currentUser={currentUser}
        onRoleChange={handleRoleChange}
        onLogout={handleLogout}
        onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        isMobileNavOpen={isMobileNavOpen}
        onOpenNewPostModal={() => {
          setEditingPost(undefined);
          setIsPostModalOpen(true);
        }}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar Navigation (Desktop docked, Mobile drawer) */}
        <Sidebar
          activePage={activePage}
          onNavigate={(page) => {
            setActivePage(page);
            setIsMobileNavOpen(false);
          }}
          userRole={userRole}
          isMobileNavOpen={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
        />

        {/* Main Content View Container - Full Width on Mobile */}
        <main className="flex-1 w-full max-w-full overflow-y-auto bg-[#06090f] pb-24 lg:pb-16 min-w-0">
          {/* AI Workforce OS Routes */}
          {activePage === 'ceo_workspace' && <CeoWorkspaceView onNavigate={setActivePage} />}

          {activePage === 'tasks' && <TasksManagementView />}

          {activePage === 'agents' && <AgentsRegistryView />}

          {activePage === 'tools' && <ToolsManagementView />}

          {activePage === 'projects' && (
            <ProjectsManagementView onNavigateToCeo={() => setActivePage('ceo_workspace')} />
          )}

          {activePage === 'analytics' && (
            <AnalyticsDashboardView analytics={analytics} posts={posts} />
          )}

          {/* Marketing & Creative Agent Engine Routes */}
          {activePage === 'dashboard' && (
            <DashboardView
              posts={posts}
              weeklyBrief={weeklyBrief}
              analytics={analytics}
              brandSettings={brandSettings}
              userRole={userRole}
              onNavigate={setActivePage}
              onOpenCreatePost={() => {
                setEditingPost(undefined);
                setIsPostModalOpen(true);
              }}
              onGenerateTopic={handleGenerateTopicClick}
            />
          )}

          {activePage === 'command_center' && (
            <AICommandCenterView
              brandSettings={brandSettings}
              onNavigate={setActivePage}
              onSavePostToQueue={(post) => {
                handleCreatePostSave(post);
                setActivePage('planner');
              }}
            />
          )}

          {activePage === 'weekly_brief' && (
            <WeeklyBriefView
              weeklyBrief={weeklyBrief}
              brandSettings={brandSettings}
              onGenerateTopic={handleGenerateTopicClick}
            />
          )}

          {activePage === 'ai_strategy' && (
            <AIStrategyHubView
              brandSettings={brandSettings}
              onNavigate={setActivePage}
              onGenerateCampaign={handleGenerateTopicClick}
            />
          )}

          {activePage === 'research' && (
            <ResearchCenterView
              competitors={competitors}
              trends={trends}
              brandSettings={brandSettings}
              onAddCompetitor={handleAddCompetitor}
              onGenerateFromTrend={handleGenerateTopicClick}
            />
          )}

          {activePage === 'planner' && (
            <ContentPlannerView
              posts={posts}
              campaigns={initialCampaigns}
              onOpenCreatePost={() => {
                setEditingPost(undefined);
                setIsPostModalOpen(true);
              }}
              onSelectPost={(p) => {
                setEditingPost(p);
                setIsPostModalOpen(true);
              }}
              onGenerateCampaignPost={handleGenerateTopicClick}
            />
          )}

          {activePage === 'generator' && (
            <ContentGeneratorView
              brandSettings={brandSettings}
              initialTopic={generatorTopic}
              onSaveGeneratedPost={(post) => {
                handleCreatePostSave(post);
                setActivePage('planner');
              }}
              onSendToReview={(post) => {
                handleCreatePostSave({ ...post, status: 'in_review' });
                setActivePage('review');
              }}
            />
          )}

          {activePage === 'image_studio' && <ImageStudioView brandSettings={brandSettings} />}

          {activePage === 'video_studio' && <VideoStudioView brandSettings={brandSettings} />}

          {activePage === 'seo' && (
            <SEOCenterView
              brandSettings={brandSettings}
              onGeneratePostFromKeyword={handleGenerateTopicClick}
            />
          )}

          {activePage === 'review' && (
            <AIReviewCenterView
              brandSettings={brandSettings}
              postsInReview={posts.filter((p) => p.status === 'in_review')}
              onApprovePost={(postId) => handleUpdatePostStatus(postId, 'scheduled')}
            />
          )}

          {activePage === 'publishing' && (
            <PublishingCenterView
              posts={posts}
              userRole={userRole}
              onUpdateStatus={handleUpdatePostStatus}
              onDeletePost={handleDeletePost}
              onOpenCreatePost={() => {
                setEditingPost(undefined);
                setIsPostModalOpen(true);
              }}
            />
          )}

          {activePage === 'automation' && (
            <AutomationIntegrationsView brandSettings={brandSettings} />
          )}

          {activePage === 'team' && (
            <TeamWorkspaceView
              teamMembers={teamMembers}
              userRole={userRole}
              onInviteMember={handleInviteMember}
            />
          )}

          {activePage === 'brand_settings' && (
            <BrandSettingsView
              brandSettings={brandSettings}
              onSaveBrandSettings={setBrandSettings}
            />
          )}

          {activePage === 'enterprise' && (
            <EnterpriseView userRole={userRole} onRoleChange={setUserRole} />
          )}

          {activePage === 'billing' && <BillingView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Phone-First Quick Navigation) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090d16]/95 backdrop-blur-xl border-t border-white/[0.08] px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <button
          onClick={() => {
            setActivePage('ceo_workspace');
            setIsMobileNavOpen(false);
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activePage === 'ceo_workspace'
              ? 'text-cyan-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">CEO</span>
        </button>

        <button
          onClick={() => {
            setActivePage('tasks');
            setIsMobileNavOpen(false);
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activePage === 'tasks'
              ? 'text-cyan-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ListTodo className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Tasks</span>
        </button>

        <button
          onClick={() => {
            setActivePage('agents');
            setIsMobileNavOpen(false);
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activePage === 'agents'
              ? 'text-cyan-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Fleet</span>
        </button>

        <button
          onClick={() => {
            setActivePage('generator');
            setIsMobileNavOpen(false);
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activePage === 'generator'
              ? 'text-cyan-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Generate</span>
        </button>

        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            isMobileNavOpen
              ? 'text-indigo-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">All Apps</span>
        </button>
      </nav>

      {/* Global Create/Edit Post Modal */}
      <CreatePostModal
        isOpen={isPostModalOpen}
        onClose={() => {
          setIsPostModalOpen(false);
          setEditingPost(undefined);
        }}
        onSave={handleCreatePostSave}
        initialData={editingPost}
      />
    </div>
  );
}

export default App;
