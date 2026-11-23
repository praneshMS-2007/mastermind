import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  CheckCircle2,
  Mail,
  UserCheck,
  Building,
  MoreVertical,
} from 'lucide-react';
import { TeamMember, UserRole } from '../types';

interface TeamWorkspaceViewProps {
  teamMembers: TeamMember[];
  userRole: UserRole;
  onInviteMember: (member: TeamMember) => void;
}

export const TeamWorkspaceView: React.FC<TeamWorkspaceViewProps> = ({
  teamMembers,
  userRole,
  onInviteMember,
}) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('team_member');
  const [newDepartment, setNewDepartment] = useState('Content & Growth');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newName.trim()) return;

    onInviteMember({
      id: `m-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      department: newDepartment,
      status: 'active',
    });

    setNewName('');
    setNewEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
              RBAC & Workspace Permissions
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Team Collaboration & Approval Workflow</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage Admin, Team Member, and Viewer access, assign posts, and maintain approval logs.
          </p>
        </div>

        {userRole === 'admin' && (
          <button
            onClick={() => setShowInviteModal(true)}
            className="relative z-10 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.25)] transition-all cursor-pointer font-mono"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Team Member</span>
          </button>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleInvite}
            className="bg-[#0b0f1b] border border-white/[0.1] rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl"
          >
            <h3 className="font-bold text-white text-sm tracking-tight">Invite New Workspace Member</h3>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-mono text-[11px] uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Jordan Smith"
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-mono text-[11px] uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="jordan@company.com"
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-mono text-[11px] uppercase tracking-wider">Workspace Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as UserRole)}
                className="w-full bg-[#070b14] border border-white/[0.08] focus:border-purple-500/50 rounded-xl p-3 text-xs text-slate-200 focus:outline-none font-mono"
              >
                <option value="admin">Admin (Full Access & Billing)</option>
                <option value="team_member">Team Member (Generate & Schedule)</option>
                <option value="viewer">Viewer (Read Only & Comment)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 bg-[#070b14] hover:bg-white/[0.06] border border-white/[0.08] text-slate-400 rounded-xl text-xs font-mono cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs font-mono shadow-[0_0_15px_rgba(147,51,234,0.3)] cursor-pointer"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Team Members List */}
      <div className="bg-[#0b0f1b]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center justify-between border-b border-white/[0.06] pb-3">
          <span className="font-mono">Active Members ({teamMembers.length})</span>
          <span className="text-xs text-purple-300 font-mono">Current Session: {userRole.toUpperCase()}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-4 bg-[#070b14] border border-white/[0.06] hover:border-purple-500/30 rounded-xl flex items-center justify-between gap-3 transition-all"
            >
              <div className="flex items-center gap-3">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-xl object-cover border border-white/[0.08]" />
                <div>
                  <h4 className="font-bold text-slate-100 text-xs">{member.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">{member.email}</p>
                  <p className="text-[10px] text-purple-300/80 font-mono">{member.department}</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {member.role.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
