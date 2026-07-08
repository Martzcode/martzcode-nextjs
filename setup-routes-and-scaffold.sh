#!/bin/bash
# À lancer depuis la racine du projet (portfolio/)
set -e

echo "Création des routes dynamiques..."

# --- Routes blog ---
mkdir -p src/app/blog/\[slug\]
mkdir -p src/app/blog/tags/\[tag\]

# --- Routes projets (structure miroir du blog) ---
mkdir -p src/app/projets/\[slug\]

# --- Route recherche ---
mkdir -p src/app/recherche

# --- Contenu MDX ---
mkdir -p src/content/blog
mkdir -p src/content/projets

# --- lib pour la logique (TOC, tags, recherche) ---
mkdir -p src/lib

touch src/app/blog/\[slug\]/.gitkeep 2>/dev/null || true

echo "Routes créées."
echo ""
echo "---"
echo ""

# ============================================
# Scaffolder : crée un nouvel article ou projet
# Usage : ./new-content.sh blog mon-super-article
#         ./new-content.sh projets mon-super-projet
# ============================================

cat > new-content.sh << 'SCRIPT_EOF'
#!/bin/bash
set -e

TYPE=$1   # "blog" ou "projets"
SLUG=$2   # ex: "mon-super-article"

if [[ -z "$TYPE" || -z "$SLUG" ]]; then
  echo "Usage: ./new-content.sh [blog|projets] mon-slug"
  exit 1
fi

if [[ "$TYPE" != "blog" && "$TYPE" != "projets" ]]; then
  echo "Erreur : le type doit être 'blog' ou 'projets'"
  exit 1
fi

CONTENT_DIR="src/content/$TYPE/$SLUG.mdx"
IMAGE_DIR="public/images/$TYPE/$SLUG"

# Dossier images dédié à cet article/projet (cover + thumbnail)
mkdir -p "$IMAGE_DIR"
touch "$IMAGE_DIR/.gitkeep"

echo "Dépose ici tes deux images :"
echo "  - $IMAGE_DIR/cover.jpg      (grande image, header de l'article/projet)"
echo "  - $IMAGE_DIR/thumbnail.jpg  (vignette, affichée dans la liste)"

# Fichier MDX avec frontmatter pré-rempli
if [[ -f "$CONTENT_DIR" ]]; then
  echo "Le fichier $CONTENT_DIR existe déjà, rien n'est écrasé."
else
  cat > "$CONTENT_DIR" << MDX_EOF
---
title: "Titre de l'article"
description: "Résumé court affiché dans la liste et pour le SEO (150-160 caractères)"
date: "$(date +%Y-%m-%d)"
tags: []
coverImage: "/images/$TYPE/$SLUG/cover.jpg"
thumbnail: "/images/$TYPE/$SLUG/thumbnail.jpg"
published: false
---

Contenu de l'article ici.
MDX_EOF
  echo "Fichier créé : $CONTENT_DIR"
fi
SCRIPT_EOF

chmod +x new-content.sh

echo "Scaffolder créé : ./new-content.sh"
echo ""
echo "Exemple d'utilisation :"
echo "  ./new-content.sh blog mon-premier-article"
echo "  ./new-content.sh projets tracker-revenus-passifs"
