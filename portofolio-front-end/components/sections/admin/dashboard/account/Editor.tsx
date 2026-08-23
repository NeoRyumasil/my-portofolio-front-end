import React from 'react';
import { User, Lock, Save, UserPlus, ShieldAlert, Edit2, X } from 'lucide-react';

interface AccountEditorProps {
  formData: { username: string; password: string; confirmPassword: string };
  setFormData: React.Dispatch<React.SetStateAction<{ username: string; password: string; confirmPassword: string }>>;
  editingId: string | null;
  isSaving: boolean;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function Editor({ formData, setFormData, editingId, isSaving, onSave, onCancel }: AccountEditorProps) {
  return (
    <div className="xl:col-span-2 bg-white dark:bg-[#121212] p-8 md:p-10 rounded-[32px] shadow-sm border border-[#7DD3FC]/20 dark:border-[#991B1B]/30 transition-all duration-300">
      
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#7DD3FC]/20 dark:border-[#991B1B]/30">
        <div className="p-4 bg-[#F0F9FF] dark:bg-[#E11D48]/10 text-[#0369A1] dark:text-[#E11D48] rounded-2xl transition-colors">
          {editingId ? <Edit2 size={32} /> : <UserPlus size={32} />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-space">
            {editingId ? 'Edit Account' : 'Add New Account'}
          </h2>
          <p className="text-sm text-[#0F172A]/60 dark:text-white/60 mt-1">
            {editingId ? 'Update admin credentials.' : 'Create a new admin account to access this dashboard.'}
          </p>
        </div>
      </div>

      <form onSubmit={onSave} className="space-y-6">
        
        {/* Warning Banner */}
        <div className="flex items-start gap-3 p-4 bg-orange-100 dark:bg-orange-950/30 text-orange-800 dark:text-orange-400 rounded-2xl border border-orange-200 dark:border-orange-900/50">
          <ShieldAlert size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">
            <strong>Security Notice:</strong> Anyone with an account can modify your portfolio data, add projects, and delete credentials. Please ensure you only grant access to trusted individuals.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space ml-1">Username</label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-[#0369A1] dark:text-[#E11D48] pointer-events-none">
              <User size={20} />
            </div>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="e.g., admin_alvin"
              className="w-full pl-12 pr-4 py-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-2xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] transition-all duration-300"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space ml-1">
              {editingId ? 'New Password (Optional)' : 'Password'}
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#0369A1] dark:text-[#E11D48] pointer-events-none">
                <Lock size={20} />
              </div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={editingId ? "Leave blank to keep old" : "••••••••"}
                className="w-full pl-12 pr-4 py-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-2xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] transition-all duration-300"
                required={!editingId}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#0F172A] dark:text-white font-space ml-1">Confirm Password</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#0369A1] dark:text-[#E11D48] pointer-events-none">
                <Lock size={20} />
              </div>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-[#F0F9FF]/50 dark:bg-[#000000]/50 border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 rounded-2xl text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0369A1] dark:focus:ring-[#E11D48] transition-all duration-300"
                required={!!formData.password} 
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 bg-[#F0F9FF] dark:bg-[#1A1A1A] text-[#0F172A] dark:text-white border border-[#7DD3FC]/50 dark:border-[#991B1B]/50 px-6 py-4 rounded-2xl font-bold font-space hover:-translate-y-1 transition-all duration-300"
            >
              <X size={20} /> Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#0369A1] dark:bg-[#E11D48] text-white px-8 py-4 rounded-2xl font-bold font-space shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            <Save size={20} />
            {isSaving ? 'Saving...' : (editingId ? 'Update Account' : 'Create Account')}
          </button>
        </div>

      </form>
    </div>
  );
}