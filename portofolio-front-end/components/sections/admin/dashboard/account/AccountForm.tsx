"use client";

import React, { useState } from 'react';
import List, { Account } from '@/components/sections/admin/dashboard/account/List';
import Editor from '@/components/sections/admin/dashboard/account/Editor';

export default function AccountForm() {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', username: 'admin_alvin' },
    { id: '2', username: 'pm@digi.com' },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (acc: Account) => {
    setEditingId(acc.id);
    setFormData({
      username: acc.username,
      password: '', 
      confirmPassword: ''
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this admin account?')) {
      setAccounts(accounts.filter(a => a.id !== id));
      if (editingId === id) handleCancel(); 
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ username: '', password: '', confirmPassword: '' });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password || formData.confirmPassword || !editingId) {
      if (formData.password !== formData.confirmPassword) {
        alert("Oops! Password and Confirm Password do not match.");
        return;
      }
      if (!editingId && !formData.password) {
        alert("Password is required for new accounts.");
        return;
      }
    }

    setIsSaving(true);
    
    setTimeout(() => {
      if (editingId) {
        setAccounts(accounts.map(acc => acc.id === editingId ? { ...acc, username: formData.username } : acc));
        alert('Account updated successfully!');
      } else {
        setAccounts([...accounts, { id: Date.now().toString(), username: formData.username }]);
        alert('New admin account added successfully!');
      }
      
      handleCancel();
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
      <Editor 
        formData={formData}
        setFormData={setFormData}
        editingId={editingId}
        isSaving={isSaving}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      
      <List 
        accounts={accounts}
        editingId={editingId}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}