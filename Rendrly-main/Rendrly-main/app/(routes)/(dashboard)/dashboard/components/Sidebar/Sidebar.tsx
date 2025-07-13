import { LogoDashboard } from "../logoDashboard";
import { SidebarRoutes } from "../SidebarRoutes";
export function Sidebar() {
  return <div className="flex flex-col h-full border-r">
    <LogoDashboard/>
    <SidebarRoutes/>
  </div>;
}
