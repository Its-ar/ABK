"use client";
import { useState } from "react";

const dummyUsers = [
  { id: 1, name: "Arman", email: "arman@example.com", role: "owner" },
  { id: 2, name: "Dina", email: "dina@example.com", role: "staff" },
];

export default function UserTable() {
  const [users] = useState(dummyUsers);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2 capitalize">{user.role}</td>
              <td className="px-4 py-2 space-x-2">
                <button className="text-blue-600 hover:underline ">Edit</button>
                <button className="text-red-600 hover:underline">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
