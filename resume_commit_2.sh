#!/bin/bash
set -e

# Resume from Docs Layout Components
git add docs-site/src/components/Header.tsx docs-site/src/components/ThemeToggle.tsx docs-site/src/components/MobileWindowedWarning.tsx docs-site/src/components/Redirect.tsx
git commit -m "feat(docs): add layout and utility components"

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

git add docs-site/src/layouts/ docs-site/src/App.tsx docs-site/src/main.tsx docs-site/components.json docs-site/src/pages/Index.tsx docs-site/src/pages/NotFound.tsx docs-site/src/pages/Showcase.tsx docs-site/src/pages/Tools.tsx
git commit -m "feat(docs): finalize app functionality"

# Cleanup any leftovers
git add .
git commit -m "chore: add remaining files" || true

echo "Done!"
