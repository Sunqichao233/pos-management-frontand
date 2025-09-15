import { Button } from "@/components/ui/button"
import { Bell, MessagesSquare, HelpCircle,SquareMenu,Sparkle  } from 'lucide-react';

export function NavBottom() {
    return (
    <div className="flex flex-row items-center justify-around w-full px-1 py-2 overflow-hidden">
      {/* 使用最小间距和紧凑图标尺寸确保不超出 */}
      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
        <Bell className="h-4 w-4 text-gray-600 hover:text-blue-600 transition-colors" />
      </Button>

      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
        <MessagesSquare className="h-4 w-4 text-gray-600 hover:text-blue-600 transition-colors" />
      </Button>

      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
        <SquareMenu className="h-4 w-4 text-gray-600 hover:text-blue-600 transition-colors" />
      </Button>

      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
        <HelpCircle className="h-4 w-4 text-gray-600 hover:text-blue-600 transition-colors" />
      </Button>

      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
        <Sparkle className="h-4 w-4 text-gray-600 hover:text-blue-600 transition-colors" />
      </Button>
    </div>
    )
}