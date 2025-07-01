# Gemini CLI

[![Gemini CLI CI](https://github.com/google-gemini/gemini-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/google-gemini/gemini-cli/actions/workflows/ci.yml)

![Gemini CLI 截图](./docs/assets/gemini-screenshot.png)

该存储库包含 Gemini CLI，这是一个命令行 AI 工作流工具，可连接到您的工具、理解您的代码并加速您的工作流。

使用 Gemini CLI, 您可以：

- 在 Gemini 的 1M 令牌上下文窗口内及之外查询和编辑大型代码库。
- 使用 Gemini 的多模态功能从 PDF 或草图生成新应用。
- 自动化操作任务，例如查询拉取请求或处理复杂的变基。
- 使用工具和 MCP 服务器连接新功能, 包括[使用 Imagen、Veo 或 Lyria 生成媒体](https://github.com/GoogleCloudPlatform/vertex-ai-creative-studio/tree/main/experiments/mcp-genmedia)。
- 使用内置于 Gemini 的 [Google 搜索](https://ai.google.dev/gemini-api/docs/grounding)工具来支持您的查询。

## 快速入门

1.  **先决条件：** 确保您已安装 [Node.js 18 或更高版本](https://nodejs.org/en/download)。
2.  **运行 CLI：** 在您的终端中执行以下命令：

    ```bash
    npx https://github.com/google-gemini/gemini-cli
    ```

    或者使用以下命令安装：

    ```bash
    npm install -g @google/gemini-cli
    gemini
    ```

3.  **选择一个颜色主题**
4.  **进行身份验证：** 出现提示时，使用您的个人 Google 帐户登录。这将允许您使用 Gemini 每分钟最多发出 60 个模型请求，每天最多发出 1,000 个模型请求。

现在您已准备好使用 Gemini CLI！

### 对于高级用途或增加限制：

如果您需要使用特定模型或需要更高的请求容量, 您可以使用 API 密钥：

1.  从 [Google AI Studio](https://aistudio.google.com/apikey) 生成一个密钥。
2.  在您的终端中将其设置为环境变量。将 `YOUR_API_KEY` 替换为您生成的密钥。

    ```bash
    export GEMINI_API_KEY="YOUR_API_KEY"
    ```

有关其他身份验证方法 (包括 Google Workspace 帐户), 请参阅[身份验证](./docs/cli/authentication.md)指南。

## 示例

CLI 运行后，您可以开始从 shell 与 Gemini 进行交互。

您可以从一个新目录开始一个项目：

```sh
cd new-project/
gemini
> 给我写一个 Gemini Discord 机器人, 使用我将提供的 FAQ.md 文件来回答问题
```

或者处理一个现有项目：

```sh
git clone https://github.com/google-gemini/gemini-cli
cd gemini-cli
gemini
> 给我一份昨天所有变更的摘要
```

### 后续步骤

-   了解如何[贡献或从源代码构建](./CONTRIBUTING.md)。
-   探索可用的 **[CLI 命令](./docs/cli/commands.md)**。
-   如果您遇到任何问题, 请查看**[故障排除指南](./docs/troubleshooting.md)**。
-   有关更全面的文档, 请参阅[完整文档](./docs/index.md)。
-   查看一些[热门任务](#热门任务)以获取更多灵感。

### 故障排除

如果您遇到问题，请转到[故障排除](docs/troubleshooting.md)指南。

## 热门任务

### 探索新的代码库

首先 `cd` 进入一个现有或新克隆的存储库并运行 `gemini`。

```text
> 描述这个系统架构的主要部分。
```

```text
> 有哪些安全机制？
```

### 使用您现有的代码

```text
> 为 GitHub 问题 #123 实现一个初稿。
```

```text
> 帮助我将此代码库迁移到最新版本的 Java。从一个计划开始。
```

### 自动化您的工作流

使用 MCP 服务器将您的本地系统工具与您的企业协作套件集成。

```text
> 给我制作一个幻灯片, 显示过去 7 天的 git 历史记录, 按功能和团队成员分组。
```

```text
> 为墙上显示器制作一个全屏 Web 应用程序, 以显示我们互动最多的 GitHub 问题。
```

### 与您的系统互动

```text
> 将此目录中的所有图像转换为 png, 并根据 exif 数据中的日期重命名它们。
```

```text
> 按支出月份整理我的 PDF 发票。
```

### 卸载

有关卸载说明，请转到[卸载](docs/Uninstall.md)指南。

## 服务条款和隐私声明

有关适用于您使用 Gemini CLI 的服务条款和隐私声明的详细信息, 请参阅[服务条款和隐私声明](./docs/tos-privacy.md)。 