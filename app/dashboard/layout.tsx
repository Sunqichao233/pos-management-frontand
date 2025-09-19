import { SidebarPOS } from './components/SidebarPOS';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <SidebarPOS />
            <main className="flex-1 flex flex-col">
                {/* 这里是 TopNav，但为了简洁，暂时放在 page.tsx 中实现 */}
                {children}
            </main>
        </div>
    );
}