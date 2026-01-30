#!/bin/bash
set -e

# Resume from Contracts README
git add -f contracts/README.md
git commit -m "docs(contracts): add readme"

# 4. Apps (RPS) (10 commits)
git add apps/rock-paper-scissors/index.html apps/rock-paper-scissors/public/
git commit -m "feat(rps): add entry point and assets"

git add apps/rock-paper-scissors/src/index.css
git commit -m "style(rps): add global styles"

git add apps/rock-paper-scissors/src/types/ apps/rock-paper-scissors/src/types.d.ts apps/rock-paper-scissors/src/vite-env.d.ts
git commit -m "feat(rps): add type definitions"

git add apps/rock-paper-scissors/src/constants/
git commit -m "feat(rps): add constants and abi"

git add apps/rock-paper-scissors/src/utils/
git commit -m "feat(rps): add utility functions"

git add apps/rock-paper-scissors/src/services/
git commit -m "feat(rps): add api and wallet services"

git add apps/rock-paper-scissors/src/managers/
git commit -m "feat(rps): add game logic managers"

git add apps/rock-paper-scissors/src/components/
git commit -m "feat(rps): add ui components"

git add apps/rock-paper-scissors/src/hooks/
git commit -m "feat(rps): add custom hooks"

git add apps/rock-paper-scissors/src/App.tsx apps/rock-paper-scissors/src/main.tsx
git commit -m "feat(rps): assemble main application"

# 5. Docs Site (15 commits)
git add docs-site/index.html docs-site/public/
git commit -m "feat(docs): add entry point and assets"

git add docs-site/src/index.css
git commit -m "style(docs): add global styles and animations"

git add docs-site/src/lib/ docs-site/src/hooks/
git commit -m "feat(docs): add utils and hooks"

git add docs-site/src/components/ui/button.tsx docs-site/src/components/ui/card.tsx docs-site/src/components/ui/badge.tsx docs-site/src/components/ui/input.tsx docs-site/src/components/ui/label.tsx
git commit -m "feat(docs): add basic ui components"

git add docs-site/src/components/ui/select.tsx docs-site/src/components/ui/textarea.tsx docs-site/src/components/ui/tabs.tsx
git commit -m "feat(docs): add form and layout ui components"

git add docs-site/src/components/ui/
git commit -m "feat(docs): add remaining ui components"

git add docs-site/src/components/Footer.tsx docs-site/src/components/Navbar.tsx docs-site/src/components/MobileWindowedWarning.tsx
git commit -m "feat(docs): add layout components"

git add docs-site/src/components/DocumentationRenderer.tsx
git commit -m "feat(docs): add content renderer"

git add docs-site/src/components/DocumentationSidebar.tsx docs-site/src/components/WindowedSidebar.tsx docs-site/src/components/DraggableWindow.tsx
git commit -m "feat(docs): add sidebar and windowing system"

git add docs-site/src/context/ContentContext.tsx
git commit -m "feat(docs): add content management context"

git add docs-site/src/pages/Admin.tsx
git commit -m "feat(docs): add admin panel"

git add docs-site/src/pages/Landing.tsx docs-site/src/components/pitchdeck/
git commit -m "feat(docs): add landing page and pitch deck viewer"

git add docs-site/src/pages/PitchDeck.tsx
git commit -m "feat(docs): add pitch deck page"

git add docs-site/src/pages/Demo.tsx docs-site/src/pages/Documentation.tsx
git commit -m "feat(docs): add demo and documentation pages"

git add docs-site/src/layouts/ docs-site/src/App.tsx docs-site/src/main.tsx docs-site/components.json
git commit -m "feat(docs): finalize app functionality"

# Cleanup any leftovers
git add .
git commit -m "chore: add remaining files" || true

echo "Done!"
