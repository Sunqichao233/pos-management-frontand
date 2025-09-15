"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { User, ChevronRight, LogOut } from 'lucide-react';


export function NavTop() {

  const router = useRouter()

  type User = {
    id: number;
    name: string; // other fields as needed
  };

  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    // 调用实际的登出逻辑
    // localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <SidebarMenu >
      <SidebarMenuItem>
        <DropdownMenu
          // 2. 绑定状态到菜单的 open 属性
          open={isMenuOpen}
          // 3. 监听菜单状态变化，同步到状态变量
          onOpenChange={(open) => setIsMenuOpen(open)}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border w-[202px] ml-2" size="lg" >
              <User />
              <span className="">{user ? user.name : 'HCLM Group LLC'}</span>
              <ChevronRight className="" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {user ? user.name : 'HCLM Group LLC'}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()} // 阻止下拉菜单默认关闭行为
                  onClick={(e) => e.stopPropagation()} // 防止事件冒泡导致菜单关闭
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely Log Out?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsMenuOpen(false)}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={logout}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
