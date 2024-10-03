import Sidebar from "./dashboard/_components/Sidebar"
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: "Dashboard",
  description: "Dashboard for recipes",
  icons: {
    type: 'image/svg',
    icon: '/logo.svg',
  }
}



export default function DashboardLayout({ children }) {
  return (
    <section className="min-h-screen w-full bg-lightgray p-4">
      <Sidebar />
        {children}
       <Toaster />
    </section>
  );
}