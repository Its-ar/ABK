type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function UserRoleSelect({ value, onChange }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full border p-2 rounded">
      <option value="superadmin">Superadmin</option>
      <option value="owner">Owner</option>
      <option value="staff">Staff</option>
    </select>
  );
}
