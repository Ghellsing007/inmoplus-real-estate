import {Calendar, Car, Heart,AlignJustify } from "lucide-react";

export const dataGeneralSidebar = [
    {
        icon : Car,
        label: "Cars",
        href: "/dashboard"
    },
    {
        icon : Calendar,
        label: "Cars Reserve",
        href: "/reserves"
    },
    {
        icon : Heart,
        label: "Loved-cars",
        href: "/loved-cars"
    },
]

export const dataAdminSidebar = [
    {
        icon : AlignJustify,
        label: "Manage your cars",
        href: "/dashboard/admin/manage-cars"
    },
    {
        icon : Calendar,
        label: "All reserves",
        href: "/dashboard/admin/reserves-admin"
    },
   
]