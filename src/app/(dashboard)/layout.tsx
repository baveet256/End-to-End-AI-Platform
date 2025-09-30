import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            {/* Sidebar stays fixed */}
            <DashboardSidebar />

            <main className="flex flex-col h-screen w-screen 
                             bg-gradient-to-br from-amber-200 via-pink-200 to-orange-200 
                             text-gray-900 overflow-auto">
                {/* Navbar with subtle shadow and glass effect */}
                <DashboardNavbar/>

                {/* Main content area with padding */}
                <div className="flex-1 p-6 md:p-10 overflow-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-amber-200">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
};

export default Layout;
