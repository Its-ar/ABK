"use client";

import { useState, useEffect } from "react";
import Modal from "@/app/component/ui/modal";
import UserForm from "./component/userForm";
import { supabase } from "@/lib/supabese";

export default function UserPage() {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [editUser, setEditUser] = useState<any>(null);

  const handleSubmit = (data: any) => {
    if (editUser) {
      setUsers(users.map((u) => (u.id === editUser.id ? { ...data, id: u.id } : u)));
    } else {
      setUsers([...users, { ...data, id: Date.now() }]);
    }
    setOpenModal(false);
    setEditUser(null);
  };

  const handleEdit = (user: any) => {
    setEditUser(user);
    setOpenModal(true);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manajemen User</h1>

      <button
        onClick={() => {
          setOpenModal(true);
          setEditUser(null);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-4"
      >
        + Tambah User
      </button>

      <table className="w-full text-left border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                <button onClick={() => handleEdit(user)} className="text-blue-600 hover:underline mr-2">
                  Edit
                </button>
                <button onClick={() => setUsers(users.filter((u) => u.id !== user.id))} className="text-red-600 hover:underline">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditUser(null);
        }}
        title={editUser ? "Edit User" : "Tambah User"}
      >
        <UserForm onSubmit={handleSubmit} initialData={editUser} />
      </Modal>
    </div>
  );
}
