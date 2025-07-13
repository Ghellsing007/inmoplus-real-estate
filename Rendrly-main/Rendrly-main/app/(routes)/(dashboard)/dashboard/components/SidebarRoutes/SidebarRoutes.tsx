"use client";

import { Separator } from "@/components/ui/separator";
import { useAuth } from "@clerk/nextjs";
import { dataAdminSidebar, dataGeneralSidebar } from "./SidebarRoutes.data";
import { SidebarItem } from "./SidebarItem";
import { isAdministrator } from "@/lib/isAdministrator";

export function SidebarRoutes() {
  const { userId } = useAuth();
  

  return (
    <div className="flex  flex-col justify-between h-full">
      <div>
        <Separator />
        <div className="p-2 md:p-6">
          <p className="mb-2 text-slate-700">GENERAL</p>
          {dataGeneralSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>

        <Separator />

        {isAdministrator(userId)&&(
          <div className="p-2 md:p-6">
          <p className="mb-2 text-slate-700">ADMIN</p>
          {dataAdminSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
        )}

        
        <Separator />

        
      </div>
      <footer className="p-3 mt-3 text-center">
          2025. All right reserved
        </footer>
    </div>
  );
}
