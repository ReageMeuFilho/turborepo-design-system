# UnifiedTreasuryOS Design System Monorepo

This repository is the foundation for the **UnifiedTreasuryOS** application, built on a **Zero-Drift Pipeline** architecture to ensure perfect synchronization between design and code. It uses a **Turborepo** monorepo structure to manage the Next.js application and the shared UI library.

## 🏗 Architecture Overview

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Source of Truth** | Figma Variables | Defines all atomic design decisions (colors, spacing, radius). |
| **Translator** | Custom Token Builder | Converts Figma's `tokens.json` into platform-specific formats (CSS variables, Tailwind config). |
| **Component Layer** | React, Tailwind, Storybook | Isolated development and documentation of reusable UI components. |
| **Enforcer** | Chromatic (Visual CI) | Automatically screenshots components on every code change to prevent visual drift. |

## 🔄 Synchronization Strategy: The Zero-Drift Pipeline

The core of this system is the automated flow of design tokens from Figma to the codebase. This process eliminates the need for manual updates, making design drift impossible.

1.  **Update Figma Variables:** A designer updates a color, spacing, or radius variable in Figma.
2.  **Export JSON:** The designer uses a tool (like **Tokens Studio for Figma**) to export the variables as a `tokens.json` file.
3.  **Trigger Automation:** The `tokens.json` file is committed to the `packages/tokens` directory, or a GitHub Action is triggered directly from Figma.
4.  **Run Token Build:** The build process runs the token pipeline (`npm run build -w packages/tokens`), which:
    *   Generates `css-variables.css` for global styles in `apps/web/public/styles/`.
    *   Generates `tailwind-tokens.js` to extend the Tailwind configuration in `apps/web/`.
5.  **Auto-PR to Repo:** The updated files are automatically committed and a Pull Request is created (or merged, depending on the setup).
6.  **Visual Regression Check:** Chromatic automatically runs on the PR to ensure the token changes did not accidentally break any existing components.

**Result:** The codebase automatically receives the design update without a developer manually changing a single value.

## 📦 Packages

| Package | Description |
| :--- | :--- |
| `apps/web` | The main Next.js 14+ application (App Router). |
| `packages/ui` | Shared React UI components built with Tailwind CSS and documented in Storybook. |
| `packages/tokens` | Contains the `tokens.json` source of truth and the custom build script for token generation. |

## 🚀 Getting Started

1.  **Install Dependencies:**
    \`\`\`bash
    npm install
    \`\`\`
2.  **Build Tokens:** (Must be run before building the app or Storybook)
    \`\`\`bash
    npm run build -w packages/tokens
    \`\`\`
3.  **Run Development:**
    \`\`\`bash
    npm run dev
    \`\`\`
    *   The Next.js app will run on `http://localhost:3000`.
    *   The Storybook will run on `http://localhost:6006` (after running `npm run storybook -w packages/ui`).

## 🛠 Next Steps (Human Action Required)

The code structure is complete, but the final connection to your external tools requires your credentials:

1.  **Figma Connection:** Set up your Figma environment to export the `tokens.json` file into the `packages/tokens` directory.
2.  **Chromatic Setup:**
    *   Sign up for Chromatic.com.
    *   Connect your GitHub repository.
    *   Add your Chromatic Project Token as a GitHub Secret named `CHROMATIC_PROJECT_TOKEN`. This will enable the visual regression workflow in `.github/workflows/chromatic.yml`.

I have completed the technical scaffolding and am ready to verify the build pipeline.
