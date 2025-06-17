# Personal Portfolio Website | 个人作品集网站

This is a personal portfolio website built with React, showcasing my skills, project experience, educational background, and contact information.

这是一个使用 React 构建的个人作品集网站，展示了我的技能、项目经验、教育背景和联系方式。

## Tech Stack | 技术栈

- React 18
- React Router
- Styled Components
- Framer Motion
- i18next (Internationalization Support | 国际化支持)
- React Icons

## Local Development | 本地开发

1. Clone the repository | 克隆仓库
```bash
git clone https://github.com/lzhu686/eportfolio.git
cd eportfolio
```

2. Install dependencies | 安装依赖
```bash
npm install
```

3. Start development server | 启动开发服务器
```bash
npm start
```
The development server will start at [http://localhost:3000](http://localhost:3000) with hot reload support.

开发服务器将在 [http://localhost:3000](http://localhost:3000) 启动，支持热重载。

## Deploy to GitHub Pages | 部署到 GitHub Pages

1. Ensure all changes are committed to the main branch | 确保所有更改已提交到主分支
```bash
git add .
git commit -m "Update content | 更新内容"
git push origin main
```

2. Deploy to GitHub Pages | 部署到 GitHub Pages
```bash
npm run deploy
```

After deployment, the website will be live at [https://lzhu686.github.io/eportfolio](https://lzhu686.github.io/eportfolio).

部署完成后，网站将在 [https://lzhu686.github.io/eportfolio](https://lzhu686.github.io/eportfolio) 上线。

## Project Structure | 项目结构

```
src/
  ├── components/     # Components Directory | 组件目录
  │   ├── Header.js   # Navigation Header | 导航头部
  │   ├── Home.js     # Home Page | 首页
  │   ├── Skills.js   # Skills Showcase | 技能展示
  │   ├── Projects.js # Projects Showcase | 项目展示
  │   ├── Education.js# Education History | 教育经历
  │   ├── Contact.js  # Contact Information | 联系方式
  │   └── AIChat.js   # AI Chat Component | AI 聊天组件
  ├── styles/         # Style Files | 样式文件
  ├── i18n/          # Internationalization Config | 国际化配置
  └── App.js         # Main Application Component | 主应用组件
```

## Main Features | 主要功能

- Responsive design for all devices | 响应式设计，适配各种设备
- Multi-language support | 多语言支持
- Project showcase | 项目展示
- Skills showcase | 技能展示
- Education history | 教育经历
- Contact information | 联系方式
- AI chat functionality | AI 聊天功能

## Notes | 注意事项

- It may take a few minutes to see updates on GitHub Pages after deployment | 部署后可能需要等待几分钟才能在 GitHub Pages 上看到更新
- If you encounter deployment issues, please check: | 如果遇到部署问题，请检查：
  - The `homepage` field in `package.json` is correct | `package.json` 中的 `homepage` 字段是否正确
  - The `gh-pages` dependency is installed | 确保有 `gh-pages` 依赖
  - You have the correct GitHub repository permissions | 确保有正确的 GitHub 仓库权限

## License | 许可证

本项目采用双重许可模式：

1. 代码部分采用 MIT 许可证
   - 允许自由使用、修改和分发代码
   - 需要保留原始版权声明
   - 不承担任何责任

2. 内容部分采用保留所有权利
   - 包括设计、图片、文档等非代码内容
   - 未经授权不得使用

## Intellectual Property Rights | 知识产权声明

Copyright © 2024 Zhu Liang. All Rights Reserved.

### Code License | 代码许可
The source code of this project is licensed under the MIT License, which allows for:
- Free use, modification, and distribution
- Commercial use
- Private use
- Patent use

本项目的源代码采用 MIT 许可证，允许：
- 自由使用、修改和分发
- 商业用途
- 私人用途
- 专利用途

### Content Rights | 内容权利
All non-code content, including but not limited to:
- Design elements
- Documentation
- Images and media
- Branding elements
- Personal information
- Portfolio content

are the exclusive property of Zhu Liang and are protected by international copyright laws.

所有非代码内容，包括但不限于：
- 设计元素
- 文档
- 图片和媒体
- 品牌元素
- 个人信息
- 作品集内容

均为朱亮的专有财产，受国际版权法保护。

### Usage Restrictions | 使用限制
未经作者明确书面许可，不得：
- 复制、修改或分发本项目的非代码内容
- 将本项目的非代码内容用于商业目的
- 创建本项目的非代码内容的衍生作品

### Contact | 联系方式
For any inquiries regarding the use of this project, please contact:
如有关于本项目使用的任何问题，请联系：
- Email | 邮箱：lzhu686@connect.hkust-gz.edu.cn
