
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Store, Ellipsis } from "lucide-react";


// 引入 menu 类型（需与 Page 中一致）
type menu = {
  id: number;
  name: string;
  location: string;
  dishs?: { id: number; name: string; price: number }[];
};

type MenuCardProps = {
  menu: menu;          // 单个菜单数据
  newMenuIds: number[]; // 新增菜单ID列表（控制New徽章）
  deleteMenu: (menuId: number) => void; // 删除菜单的方法
};

export function MenuCard({ menu, newMenuIds, deleteMenu }: MenuCardProps) {
  // 每个菜单独立的下拉菜单开关状态
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Card className="hover:bg-accent/30">
      <CardContent className="flex items-center justify-between gap-4 p-4">
        {/* 菜单名称、位置等基础信息 */}
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-md bg-muted text-sm font-semibold">
            {menu.name.substring(0, 2)}
          </div>
          <div>
            <div className="font-medium">{menu.name}</div>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <Store className="size-3" />
              {menu.location}
            </div>
          </div>
        </div>

        {/* 右侧：New徽章 + 下拉菜单 */}
        <div className="ml-auto flex items-center gap-2">
          {/* New徽章：仅新增菜单显示 */}
          {newMenuIds.includes(menu.id) && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800">
              New
            </Badge>
          )}

          {/* 下拉菜单：独立状态控制 */}
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="size-8">
                <Ellipsis className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              {/* 删除确认弹窗 */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to delete this menu?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsMenuOpen(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                      deleteMenu(menu.id); // 调用删除方法
                      setIsMenuOpen(false); // 关闭下拉菜单
                    }}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}