import { UserButton } from "../auth/user-button";
import { DashboardLinks } from "./dashboard-links";

export const Sidebar = () => {
  return (
    <aside className="hidden w-80 mr-2 lg:flex flex-col px-2 py-10 justify-between">
      <DashboardLinks />
      <UserButton size="large" />
    </aside>
  );
};
