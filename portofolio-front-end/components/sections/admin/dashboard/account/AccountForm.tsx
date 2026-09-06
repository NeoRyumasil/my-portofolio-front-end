"use client";

import React, { useState, useEffect } from 'react';
import List, { Account } from '@/components/sections/admin/dashboard/account/List';
import Editor from '@/components/sections/admin/dashboard/account/Editor';

export default function AccountForm() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${baseUrl}/api/accounts`, {
        credentials: 'include'
      });
      
      const json = await response.json();
      if (response.ok && json.success) {
        setAccounts(json.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data akun:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleEdit = (acc: Account) => {
    setEditingId(acc.id);
    setFormData({
      username: acc.username,
      password: '', 
      confirmPassword: ''
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this admin account?')) {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        
        const response = await fetch(`${baseUrl}/api/accounts/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        
        const json = await response.json();
        
        if (response.ok && json.success) {
          setAccounts(accounts.filter(a => a.id !== id));

          if (editingId === id) handleCancel(); 
          alert('Akun berhasil dihapus!');

        } else {
          alert(json.message || 'Gagal menghapus akun');
        }

      } catch (error) {
        console.error('Delete error:', error);
        alert('Terjadi kesalahan pada server.');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ username: '', password: '', confirmPassword: '' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password || formData.confirmPassword || !editingId) {

      if (formData.password !== formData.confirmPassword) {
        alert("Oops! Password dan Confirm Password tidak cocok.");
        return;
      }

      if (!editingId && !formData.password) {
        alert("Password wajib diisi untuk akun baru.");
        return;
      }
    }

    setIsSaving(true);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const payload: any = { username: formData.username };
 
      if (formData.password) {
        payload.password = formData.password;
      }

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId 
        ? `${baseUrl}/api/accounts/${editingId}`
        : `${baseUrl}/api/accounts`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      
      const json = await response.json();

      if (response.ok && json.success) {
        alert(json.message);
        fetchAccounts(); 
        handleCancel();

      } else {
        alert(json.message || 'Gagal menyimpan akun');
      }

    } catch (error) {
      console.error('Save error:', error);
      alert('Terjadi kesalahan pada server.');
      
    } finally {
      setIsSaving(false);
    }
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
      
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-[#121212]/50 z-10 flex items-center justify-center rounded-[32px]">
            <span className="text-[#0369A1] font-bold">Memuat...</span>
          </div>
        )}
        <List 
          accounts={accounts}
          editingId={editingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}