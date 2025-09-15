'use client'
import { useState, useEffect } from "react"
import { MenuCard } from "./components/menu-card"
import {
    SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, ChevronDown, LayoutGrid, List, } from "lucide-react"

type menu = {
    id: number,
    name: string,
    location: string,
    dishs?: {
        id: number,
        name: string,
        price: number,
    }[]
}

type dish = {
    id: number,
    name: string,
    price: number,
}

const menus: menu[] = [
    {
        id: 1,
        name: "Harry's beer mune",
        location: "Harry's",
        dishs: [{
            id: 1,
            name: "Dish 1",
            price: 10,
        }],
    },
    {
        id: 2,
        name: "Harry's beer mune",
        location: "Harry's",
        dishs: [{
            id: 1,
            name: "Dish 2",
            price: 20,
        }]
    },
    {
        id: 3,
        name: "Test menu",
        location: "Test",
        dishs: [{
            id: 1,
            name: "Dish 3",
            price: 30,
        }]
    },
]

export default function Page() {
    const [style, setStyle] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<menu[]>([]);
    const [location, setLocation] = useState('All');
    const [createMenuName, setCreateMenuName] = useState('');
    const [createMenuLocation, setCreateMenuLocation] = useState('');
    // 记录新增菜单的ID
    const [newMenuIds, setNewMenuIds] = useState<number[]>([]);

    const [menuList, setMenuList] = useState<menu[]>([]);

    useEffect(() => {
        // 真实生产环境要去后端请求API拉取真实数据
        setMenuList(menus);
    }, [])

    useEffect(() => {
        if (menuList) {
            const filteredMenus = menuList.filter(menu => {
                if (location !== 'All' && menu.location !== location) {
                    return false;
                }
                if (searchTerm === '') {
                    return true;
                }
                return menu.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setSearchResult(filteredMenus);
        }
    }, [menuList, searchTerm, location]);

    // 取消创建菜单
    const cancleCreateMenu = () => {
        setCreateMenuName('');
        setCreateMenuLocation('');
    }

    const createMenu = () => {
        if (createMenuName === '' || createMenuLocation === '') {
            alert('please fill in the name and location');
            return;
        }
        // 真实生产环境要去后端请求API创建菜单
        // 这里只是前端模拟创建菜单
        const newMenu: menu = {
            id: Math.max(...menuList?.map(menu => menu.id)) + 1,
            name: createMenuName,
            location: createMenuLocation,
        }
        setMenuList([...menuList, newMenu]);
        // 将新菜单ID加入记录，并设置5秒后移除（控制时效性）
        setNewMenuIds(prev => [...prev, newMenu.id]);
        setTimeout(() => {
            setNewMenuIds(prev => prev.filter(id => id !== newMenu.id));
        }, 5000); // 5秒后"New"徽章消失，可调整时间
        cancleCreateMenu();
    }

    // 删除菜单
    const deleteMenu = (menuId: number) => {
        // 真实生产环境要去后端请求API删除菜单
        // 这里只是前端模拟删除菜单
        setMenuList(menuList.filter(menu => menu.id !== menuId));
    }

    return (

        <SidebarInset>
            <div className="flex min-w-0 flex-1 flex-col p-4 md:p-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Menus</h1>
                    <Dialog>
                        <form>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-600">Create a menu</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Create Menu</DialogTitle>
                                    <DialogDescription>
                                        create a new menu for your business
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name-1">Name</Label>
                                        <Input id="name-1" name="name" defaultValue="" placeholder="Menu Name"
                                            value={createMenuName}
                                            onChange={(e) => setCreateMenuName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="location-1">Location</Label>
                                        <Input id="location-1" name="location" defaultValue="" placeholder="Harry's"
                                            value={createMenuLocation}
                                            onChange={(e) => setCreateMenuLocation(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" onClick={cancleCreateMenu}>Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button type="submit" onClick={createMenu}>Create</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
                </div>
                <p className="max-w-3xl text-sm text-muted-foreground">
                    Use menus to sell your items on kiosks, delivery apps, online ordering sites, and any restaurant POS modes.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search"
                                className="h-9 pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-9 justify-between whitespace-nowrap">
                                    <span className="text-muted-foreground">Locations</span>
                                    <span className="ml-2 font-medium">{location}</span>
                                    <ChevronDown className="ml-1 size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuRadioGroup value={location} onValueChange={setLocation}>
                                    <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Harry's">Harry's</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="Test">Test</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex  bg-gray-100 rounded-md p-1">
                            <Button
                                variant={style === 'grid' ? "ghost" : "outline"}
                                className="p-2"
                                onClick={() => setStyle('grid')}
                            >
                                <LayoutGrid size={16} />
                            </Button>
                            <Button
                                variant={style === 'list' ? "ghost" : "outline"}
                                className="p-2"
                                onClick={() => setStyle('list')}
                            >
                                <List size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
                {style === 'list' ?
                    (
                        <div className="mt-2 space-y-3">
                            {searchResult.map((menu) => (
                                <MenuCard
                                    key={menu.id}
                                    menu={menu}
                                    newMenuIds={newMenuIds}
                                    deleteMenu={deleteMenu}
                                />
                            ))}
                        </div>
                    )
                    :
                    (
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {searchResult.map((menu) => (
                                <MenuCard
                                    key={menu.id}
                                    menu={menu}
                                    newMenuIds={newMenuIds}
                                    deleteMenu={deleteMenu}
                                />
                            ))}
                        </div>
                    )
                }

            </div>

        </SidebarInset>
    )
}