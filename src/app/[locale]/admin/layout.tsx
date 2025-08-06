import AdminSideBar from "./AdminSideBar";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "This is the admin dashboard",
};

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: AdminDashboardLayoutProps) {
  return (
    <div className="flex items-start justify-between overflow-hidden">
        <div className="w-14 lg:w-1/5 p-1 lg:p-5 bg-purple-600 text-white h-screen">
            <AdminSideBar />
        </div>

        <div className="flex flex-col justify-start gap-4 p-4 rounded-lg shadow-md w-full lg:w-4/5 bg-white overflow-y-scroll h-screen">
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </div>

    </div>
  )
}
