import { useState, useEffect } from "react";

type User = {
  id?: number;
  name: string;
  email: string;
  role: "superadmin" | "admin" | "staff";
  password?: string;
};

type Props = {
  onSubmit: (data: User) => void;
  initialData?: User;
};

export default function UserForm({ onSubmit, initialData }: Props) {
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    role: "staff",
    password: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, password: "" }); // kosongin password saat edit
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Nama</label>
        <input name="name" type="text" value={form.name} onChange={handleChange} className="w-full border rounded-lg p-2" required />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border rounded-lg p-2" required />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Role</label>
        <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded-lg p-2">
          <option value="superadmin">Superadmin</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          placeholder={initialData ? "Kosongkan jika tidak diubah" : ""}
          required={!initialData} // hanya required saat tambah user
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        {initialData ? "Update" : "Tambah"}
      </button>
    </form>
  );
}
