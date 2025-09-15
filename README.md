
## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI组件**: Tailwind CSS + shadcn/ui
- **类型安全**: TypeScript
- **样式**: CSS Modules / Tailwind CSS

## 🚀 页面核心功能特性

- **登录页面** - 按照如图设计登录页面，暂时没判断可直接登录
- **主页面显示收益** - 大图显示收益，可直观的看到收益情况收益变化
- **菜单管理** - 可通过条件进行模糊搜索，可添加菜单，删除菜单，更改菜单显示排列方式
- **库存管理** - 根据条件模糊搜索，显示库存情况
- **收益报告** - 可展示今天和昨天销售时分段情况，并且可以看到与上周的bar图情况。可以下载俩张图
- **设备码发行** - 支持分页模糊搜索，可添加设备码，删除设备码，更改设备码状态
- **侧边栏** - 用户可以退出，可以切换要展示的页面


## 📁 推荐项目结构

```
├── api/
│   └── login.ts
├── app/
│   ├── dashboard/
│   │   ├── bank/
│   │   │   └── page.tsx
│   │   ├── home/
│   │   │   └── page.tsx
│   │   ├── products-and-services/
│   │   │   ├── inventory-management/
│   │   │   │   ├── business-partners/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── history/
│   │   │   │       └── page.tsx
│   │   │   ├── menu/
│   │   │   │   ├── components/
│   │   │   │   │   └── menu-card.tsx
│   │   │   │   └── page.tsx
│   │   │   └── merchandise/
│   │   │       └── test/
│   │   │           └── page.tsx
│   │   ├── report/
│   │   │   └── sales-trends/
│   │   │       └── page.tsx
│   │   ├── setting/
│   │   │   ├── account-and-settings/
│   │   │   │   └── test/
│   │   │   │       └── page.tsx
│   │   │   └── device-management/
│   │   │       ├── terminal-code/
│   │   │       │   └── page.tsx
│   │   │       └── terminal/
│   │   │           └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── alert-dialog.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── table.tsx
│   │   └── tooltip.tsx
│   ├── app-sidebar.tsx
│   ├── login-form.tsx
│   ├── nav-bottom.tsx
│   ├── nav-main.tsx
│   ├── nav-secondary.tsx
│   ├── nav-top.tsx
│   ├── search-form.tsx
│   └── template-documentation.tsx
├── hooks/
│   └── use-mobile.ts
├── lib/
│   └── utils.ts
├── public/
│   ├── svg/
│   │   └── undraw_empty-street_3ogh.svg
│   └── favicon.ico
├── types/
│   └── api.d.ts
├── README.md
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🏗️ 目录结构说明

### `app/` - Next.js App Router
- `login/` - 登录相关页面
- `dashboard/` - 仪表板相关页面
  - `home/` - 首页
  - `bank/` - 银行页面
  - `products-and-services/` - 产品和服务页面
    - `inventory-management/` - 库存管理页面
      - `business-partners/` - 商业伙伴页面
      - `history/` - 历史页面
    - `menu/` - 菜单页面
      - `components/` - 菜单组件
- `globals.css` - 全局样式文件
- `layout.tsx` - 全局布局组件
- `page.tsx` - 全局页面组件

### `api/` - API 路由
- `login.ts` - 登录 API 路由

### `components/` - 通用组件
- `ui/` - 基础UI组件（按钮、卡片等）
- `app-sidebar` - 侧边栏组件
- `login-form` - 登录表单组件
- `nav-bottom` - 底部导航组件
- `nav-main` - 主导航组件
- `nav-secondary` - 二级导航组件
- `nav-top` - 顶部导航组件
- `search-form` - 搜索表单组件

### `hooks/` - 自定义钩子
- `use-mobile` - 判断是否为移动设备的钩子

### `lib/` - 工具函数
- `utils.ts` - 工具函数

### `public/` - 静态资源
- `svg/` - SVG图标
- `favicon.ico` - 网站图标

### `types/` - 类型定义
- `api.d.ts` - API 类型定义

## 🚀 快速开始

### 安装依赖

```bash
npm install

### 运行开发服务器

```bash
npm run dev


在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建生产版本

```bash
npm run build
npm start
```

## 📝 开发指南

### 添加新功能

1. 在 `api/` 目录下添加对应的 API 路由
2. 在 `app/` 目录下添加对应的页面
3. 在 `components/` 目录下添加通用组件

### 组件开发规范

- 使用 TypeScript 进行类型定义
- 遵循 React Hooks 最佳实践
- 使用 Tailwind CSS 进行样式设计
