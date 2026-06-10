import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

const USERS = [
  { name: "Aarav Mehta", email: "aarav@gmail.com", role: "buyer", orders: 12, joined: "Apr 2025" },
  { name: "Neha Iyer", email: "neha.i@gmail.com", role: "buyer", orders: 28, joined: "Feb 2025" },
  { name: "Riya Kapoor", email: "riya@kapoor.in", role: "buyer", orders: 7, joined: "May 2026" },
  { name: "Vikram Singh", email: "vsingh@out.com", role: "buyer", orders: 3, joined: "Jun 2026" },
  { name: "Lakshmi Devi", email: "lakshmi@kalamitra.in", role: "seller", orders: 0, joined: "Mar 2025" },
  { name: "Manoj Patel", email: "manoj@kalamitra.in", role: "seller", orders: 0, joined: "Jan 2025" },
];

function AdminUsers() {
  return (
    <div>
      <PageHeader title="Users" subtitle="48,206 buyers · 2,431 sellers · 6 admins" />
      <div className="rounded-2xl glass">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Orders</th>
                <th className="px-5 py-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr key={u.email} className="border-t border-border/60">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-sm font-semibold text-primary-foreground">
                        {u.name[0]}
                      </div>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 capitalize">{u.role}</td>
                  <td className="px-5 py-4">{u.orders}</td>
                  <td className="px-5 py-4 text-muted-foreground">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
