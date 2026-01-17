# Lora-website

基于 Next.js 16 构建的个人网站，集成了 Contentlayer、Fumadocs 和多种 Magic UI 组件。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **内容管理**: Contentlayer
- **文档/博客 UI**: Fumadocs
- **组件库**: Tailwind CSS 4, Radix UI, Magic UI, Framer Motion
- **部署**: Cloudflare Pages (使用 OpenNext)
- **包管理器**: Bun / npm

## 开发指南

首先，安装依赖：

```bash
bun install
```

启动开发服务器：

```bash
bun dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 部署说明 (Cloudflare Pages)

本项目针对 Cloudflare Pages 进行了优化，使用 `@opennextjs/cloudflare` 适配器。

### 本地构建

在部署之前，你可以运行以下命令进行本地构建以检查兼容性：

```bash
bun run build:cf
```

### 部署步骤

1. **关联 GitHub**: 在 Cloudflare 控制台创建新的 Pages 项目并关联此仓库。
2. **构建设置**:
   - **Framework preset**: `None` (或者手动配置)
   - **Build command**: `npm run build:cf`
   - **Build output directory**: `.open-next/assets`
3. **环境变量**:
   - 在 **Settings -> Functions -> Compatibility flags** 中添加 `nodejs_compat` 标志（Production 和 Preview 都需要）。

## 故障排除

### wrangler.jsonc 架构加载错误
如果遇到 `无法从 node_modules/wrangler/config-schema.json 加载架构` 的警告，请确保已安装 `wrangler` 开发依赖：

```bash
npm install -D wrangler --legacy-peer-deps
```

## 许可证

[MIT](LICENSE)
