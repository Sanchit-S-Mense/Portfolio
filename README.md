# Portfolio Website

A modern, responsive portfolio website built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. All content on the homepage and projects section is read dynamically from plain `.txt` files located in the `data/` directory.

---

## 📁 How to Update Your Content

You can easily customize the website text without modifying any code! Just edit the following `.txt` files in the `data/` folder:

### 1. `data/name.txt`
Contains your full name.
- **Example**:
  ```text
  Sanchit Mense
  ```

### 2. `data/welcome.txt`
Contains your welcome message / short bio shown in the homepage hero section.
- **Example**:
  ```text
  Welcome to my portfolio! I am a software engineer focused on building modern web applications and scalable products.
  ```

### 3. `data/projects.txt`
Contains all your project entries. You can add as many projects as you want using the simple format below:
- **Format**:
  ```text
  # Project Title
  Description: A detailed explanation of your project and what it does.
  GitHub: https://github.com/yourusername/project-repo
  Tags: React, TypeScript, Next.js
  Live: https://your-project-demo.com

  # Another Project
  Description: Description for another project.
  GitHub: https://github.com/yourusername/another-repo
  Tags: Python, FastAPI, Docker
  ```

---

## 🚀 Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your portfolio website.
