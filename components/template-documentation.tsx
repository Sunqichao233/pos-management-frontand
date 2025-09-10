import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { FileText, Code, Folder, Palette, Zap, Settings } from 'lucide-react';

export function TemplateDocumentation() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        {/* 1. 页头 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">SIMPAL React 模板使用说明</h1>
          <div className="mb-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Next.js App Router + TailwindCSS + shadcn/ui
            </Badge>
          </div>
        </div>

        <div className="space-y-8">
          {/* 2. 模板概述 */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2 flex-1">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">模板概述</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>这是公司统一的 React 模板，用于快速启动新前端项目</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">目标</h4>
                  <p className="text-sm text-muted-foreground">
                    统一设计语言、组件写法与目录规范，可与 Figma 组件一一映射
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-secondary">适用场景</h4>
                  <p className="text-sm text-muted-foreground">
                    后台管理、门店看板、营销页（需 SEO 时请选 Next.js）
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. 快速开始 */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2 flex-1">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Quick Start</CardTitle>
              </div>
              <Badge variant="outline" className="text-xs">
                Node ≥ 18，包管理器建议 npm
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                    <span className="font-medium">克隆项目</span>
                  </div>
                  <div className="bg-muted/20 rounded-xl p-3 font-mono text-sm">
                    git clone &lt;你的仓库地址&gt; my-app && cd my-app
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                    <span className="font-medium">安装依赖</span>
                  </div>
                  <div className="bg-muted/20 rounded-xl p-3 font-mono text-sm">
                    npm install
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">3</span>
                    <span className="font-medium">开发运行</span>
                  </div>
                  <div className="bg-muted/20 rounded-xl p-3 font-mono text-sm">
                    npm run dev  → http://localhost:3000
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">4</span>
                    <span className="font-medium">构建部署</span>
                  </div>
                  <div className="bg-muted/20 rounded-xl p-3 font-mono text-sm">
                    npm run build && npm start
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. 目录结构 */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Folder className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">目录结构（App Router）</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/20 rounded-xl p-4 font-mono text-sm space-y-1">
                <div>app/</div>
                <div className="ml-4">layout.tsx      # 根布局</div>
                <div className="ml-4">page.tsx        # 首页</div>
                <div className="ml-4">(marketing)/    # 可选分组</div>
                <div className="ml-4">settings/page.tsx</div>
                <div>components/ui/    # shadcn 组件（Button、Card、Input…）</div>
                <div>lib/utils.ts      # cn() 等工具</div>
                <div>styles/globals.css</div>
                <div>tailwind.config.ts</div>
                <div>postcss.config.js</div>
                <div>next.config.mjs</div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                文件即路由；在 app/ 新建 segment 即可生成页面
              </div>
            </CardContent>
          </Card>

          {/* 5. 设计到代码映射 */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Design → Code 约定</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium">组件命名</span>
                    <p className="text-sm text-muted-foreground">与 shadcn/ui 对齐：Button / Card / Input / Tabs / Dialog…</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium">设计规范</span>
                    <p className="text-sm text-muted-foreground">间距：8 的倍数；圆角 16；阴影适中</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium">颜色系统</span>
                    <p className="text-sm text-muted-foreground">使用 CSS 变量 --primary、--background 等（深浅主题自动切换）</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium">图标与文案</span>
                    <p className="text-sm text-muted-foreground">图标：Lucide；文案大小：标题 28/24，正文 16</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">代码导入示例</h4>
                <div className="bg-muted/20 rounded-xl p-3 font-mono text-sm">
                  import &#123; Button &#125; from "@/components/ui/button"
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 6. 常见任务速查 */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">常见任务速查</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* A 列 */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">新增页面</h4>
                    <p className="text-sm text-muted-foreground mb-2">在 app/ 新建 foo/page.tsx → 路径 /foo</p>
                    <div className="bg-muted/20 rounded-lg p-2 font-mono text-xs">
                      app/dashboard/page.tsx
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-secondary">暗色模式</h4>
                    <p className="text-sm text-muted-foreground mb-2">在 html 上切换 .dark 类；或用系统偏好匹配</p>
                    <div className="bg-muted/20 rounded-lg p-2 font-mono text-xs">
                      document.documentElement.classList.toggle('dark')
                    </div>
                  </div>
                </div>

                {/* B 列 */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">添加组件</h4>
                    <p className="text-sm text-muted-foreground mb-2">使用 shadcn CLI 添加新组件</p>
                    <div className="bg-muted/20 rounded-lg p-2 font-mono text-xs">
                      npx shadcn@latest add button card input
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-secondary">表单与校验</h4>
                    <p className="text-sm text-muted-foreground mb-2">推荐 React Hook Form + Zod</p>
                    <div className="bg-muted/20 rounded-lg p-2 font-mono text-xs">
                      react-hook-form@7.55.0 + zod
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 脚注 */}
        <div className="mt-16 text-center space-y-2">
          <Separator />
          <div className="pt-8 text-sm text-muted-foreground space-y-1">
            <p>维护：前端模板组（联系邮箱 hclmgroupllc@gmail.com）</p>
            <p>使用前请阅读 README 与代码规范（ESLint/Prettier 已内置）</p>
          </div>
        </div>
      </div>
    </div>
  );
}
