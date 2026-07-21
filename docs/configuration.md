# Configuration, déploiement & utilisation

Documentation technique du projet martzcode (Next.js 16 — App Router).
Ce fichier complète le `README.md` : il détaille la configuration, le déploiement
et l'utilisation des scripts.

> Note : ce projet utilise une version de Next.js avec des changements
> incompatibles avec les versions habituelles. Les conventions et API peuvent
> différer de la documentation générale — se référer à
> `node_modules/next/dist/docs/` en cas de doute.

---

## 1. Prérequis

- Node.js (version compatible avec Next.js 16)
- npm
- Accès au dépôt Git

## 2. Installation

```bash
npm install
```

Pour (ré)installer les dépendances liées au blog/MDX si elles manquent :

```bash
./install-blog-deps.sh
```

Ce script installe : `gray-matter`, `next-mdx-remote`, `reading-time`,
`rehype-slug`, `rehype-autolink-headings`, `remark-gfm`, `fuse.js` et
`@types/mdx`.

## 3. Scripts npm

| Script           | Commande équivalente | Description                                   |
| ---------------- | ------------------- | --------------------------------------------- |
| `npm run dev`    | `next dev`          | Serveur de développement                       |
| `npm run build`  | `next build`        | Build de production (Turbopack)               |
| `npm run start`  | `next start`        | Sert le build de production                   |
| `npm run lint`   | `eslint`            | Lint (ESLint)                                 |

## 4. Scripts utilitaires (bash)

### `./new-content.sh [blog|projets] <slug> [fr|en]`

Crée un nouveau fichier de contenu MDX pré-rempli dans le dossier de la locale
indiquée (par défaut `fr`), ainsi que le dossier d'images dédié.

```bash
./new-content.sh blog mon-super-article fr
./new-content.sh projets mon-super-projet en
```

- Emplacement : `src/content/<type>/<locale>/<slug>.mdx`
- Images : `public/images/<type>/<slug>/` (déposer `cover.jpg` et `thumbnail.jpg`)
- Le frontmatter est pré-rempli ; le contenu est `published: false` par défaut.

> Astuce : pour qu'un article soit visible, passe `published: true` dans le
> frontmatter et utilise une date (`date`) non future.

### `./setup-routes-and-scaffold.sh`

Script de scaffold initial (création des routes `app/`, dossiers `content/`,
`lib/`, et génération de `new-content.sh`). À lancer une seule fois lors de
l'initialisation du projet. Les routes existent déjà ; ne pas relancer sans
nécessité.

### `./install-blog-deps.sh`

Voir section 2.

---

## 5. Configuration

### 5.1 Internationalisation (i18n)

Le site est bilingue `fr` / `en` via un routage par sous-chemin (`/[lang]`).

- **Langues supportées & locale par défaut** : `src/i18n/config.ts`
  - `locales = ["fr", "en"]`
  - `defaultLocale = "en"` (utilisé en fallback si `Accept-Language` ne matche
    aucune langue, et comme locale de repli pour le contenu)
- **Détection** : `src/proxy.ts` (équivalent *middleware* en Next 16) lit
  l'en-tête `Accept-Language` et redirige `/` vers `/fr` ou `/en`. Les URLs déjà
  préfixées sont conservées.
- **Dictionnaires UI** : `src/dictionaries/fr.json` et `en.json`, chargés
  côté serveur via `getDictionary(locale)` (`src/i18n/dictionaries.ts`).
- **Contenu localisé** : `src/content/<type>/<locale>/<slug>.mdx`. La logique
  est dans `src/lib/content.ts` (toutes les fonctions acceptent un paramètre
  `locale`, ex. `getPostBySlug(slug, locale)`).

Pour ajouter une langue : l'ajouter dans `locales`, créer
`dictionaries/<code>.json` et les dossiers `content/**/<code>/`.

### 5.2 Variables d'environnement

| Variable                 | Description                                         | Défaut                    |
| ------------------------ | --------------------------------------------------- | ------------------------- |
| `NEXT_PUBLIC_SITE_URL`   | URL de base pour `sitemap.xml` et `robots.txt`      | `https://martzcode.vercel.app` |

À renseigner en production (Vercel : *Project Settings → Environment
Variables*) avec l'URL réelle du domaine.

### 5.3 Site config (nom, email, réseaux)

Les informations personnelles (nom, email, téléphone, réseaux sociaux) sont centralisées dans `src/config/site.ts` :

```ts
export const siteConfig = {
  name: "Marcello Samiandrisoa",
  title: "Martzcode",
  role: "Full-Stack Engineer",
  location: "Antananarivo, Madagascar",
  email: "msamiandrisoa@gmail.com",
  phone: "(+261) 37 60 537 92",
  copyrightYear: 2026,
  github: { url: "https://github.com/martzcode", handle: "github.com/martzcode" },
  linkedin: { url: "https://linkedin.com/in/martzcode", handle: "linkedin.com/in/martzcode" },
};
```

Ce fichier est importé dans les pages (À propos, Contact, footer) et dans l'API de génération de CV. Modifier ces valeurs met automatiquement à jour tout le site.

### 5.4 Notes Next.js 16

- Le *middleware* s'appelle désormais **`proxy.ts`** (à la racine de `src/`),
  et non `middleware.ts`.
- `LayoutProps` / `PageProps` sont des helpers TypeScript globaux fournis par
  Next pour typer les paramètres de route.

---

## 6. Contenu (articles & projets)

Le contenu est stocké en fichiers `.mdx` versionnés dans Git (pas de base de
données). Chaque fichier expose ses métadonnées en *frontmatter* (validé par
zod dans `src/lib/content.ts`) et son corps en Markdown enrichi de JSX.

Schéma frontmatter (blog) :

```yaml
title: "Titre"
description: "Résumé court (SEO)"
date: "AAAA-MM-JJ"
tags: []
coverImage: "/images/blog/<slug>/cover.jpg"
thumbnail: "/images/blog/<slug>/thumbnail.jpg"
published: true
```

Schéma projet (en plus) : `stack`, `status` (`en-cours` | `termine` | `archive`),
`repoUrl`, `demoUrl`, `featured`.

La table des matières et le temps de lecture sont générés automatiquement.

---

## 7. SEO & Google Search Console

- **`src/app/sitemap.xml/route.ts`** génère `/sitemap.xml` (pages statiques +
  articles + projets, dans les deux langues, avec balises `hreflang` alternates,
  XML pretty-printé).
- **`src/app/robots.ts`** génère `/robots.txt` (pointe vers le sitemap).
- **Vérification GSC** : la balise
  `google-site-verification` est injectée via le champ `verification` des
  métadonnées dans `src/app/[lang]/layout.tsx`.

Démarche Search Console :

1. Ajouter la propriété (URL `https://martzcode.vercel.app`).
2. Choisir la méthode « balise HTML » — déjà en place via `verification`.
3. Soumettre `https://martzcode.vercel.app/sitemap.xml`.

> Les fichiers `robots.txt` et `sitemap.xml` contiennent un point dans leur nom
> et sont donc exclus de la redirection du `proxy` : ils sont servis
> directement à la racine.

---

## 8. Déploiement (Vercel)

Le site est déployé sur Vercel (URL actuelle : `https://martzcode.vercel.app`).

- **Build command** : `npm run build`
- **Output** : géré par Next.js (Turbopack)
- **Variables d'environnement** : définir `NEXT_PUBLIC_SITE_URL` avec l'URL de
  production si elle diffère du défaut.
- Le déploiement continue est généralement automatique à chaque push sur la
  branche principale (selon la config Vercel du dépôt).

---

## 9. Structure du projet (aperçu)

```
src/
├── app/
│   ├── [lang]/            # Toutes les routes, préfixées par la locale
│   │   ├── layout.tsx     # Layout racine (html lang, nav, footer, métadonnées, vérification)
│   │   ├── page.tsx       # Accueil
│   │   ├── about/ blog/ projects/ contact/ privacy/ terms/
│   │   └── blog/[slug], blog/page/[page], blog/tags/[tag]
│   │   └── projects/[slug]
│   ├── sitemap.ts         # /sitemap.xml
│   └── robots.ts          # /robots.txt
├── components/            # UI & blocs (dont les composants de contenu)
├── content/               # MDX par type et par locale
│   ├── blog/{fr,en}/
│   └── projets/{fr,en}/
├── dictionaries/          # fr.json, en.json (UI)
├── i18n/                  # config.ts, dictionaries.ts
├── lib/                   # content.ts (logique contenu)
└── types/
proxy.ts                   # Détection/redirection de langue (middleware Next 16)
```
