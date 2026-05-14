# CLAUDE.md — em bíe học tiếng

> A cozy Chinese vocabulary learning app, built as a gift. This file captures all design decisions, conventions, and setup details agreed upon so far.

---

## Project Overview

**Name:** em bíe học tiếng ("baby learns language")
**Logo:** 🍼 Milk bottle
**Stack:** TanStack Start, React, TypeScript, Tailwind CSS v4
**Target user:** Vietnamese GF, HSK 1–2 level (some Chinese basics)
**Vibe:** Cozy, warm, encouraging, intimate — like a study date

---

## Pages

### 1. Landing Page (`/`)

- Split layout: logo + tagline on the left, login/signup form on the right
- Left panel has a soft ice-blue gradient background with decorative blobs
- Right panel has a tab switch between **Log in** and **Sign up**
- Google SSO button below the form divider
- HSK level badges displayed on the left for credibility

### 2. Dashboard (`/dashboard`)

- Personalized greeting: **"Good morning, [name] 🍼"** with avatar
- **4 stat cards:** Day streak 🔥, Total XP ⭐, Cards due today 📚, Words learned ✅
- **HSK level selector:** Progress bars for HSK 1–6, clickable to switch active level
- **Weekly streak calendar:** 7-day row, today highlighted
- **XP progress bar:** Weekly XP toward a target
- **Spaced-repetition queue summary:** Overdue / Due today / Due tomorrow / Mastered
- **"Study now" CTA** → navigates to vocab page

### 3. Vocabulary Study (`/study`)

- **Mode switcher** (top bar, pill buttons):
  1. 🎯 Guess the vocab ← **default / hero mode**
  2. 🃏 Flashcard
  3. ✍️ Practice writing
  4. 🔀 Reverse MCQ
- **Main word card** (all modes share):
  - Chinese character (large, Noto Serif SC)
  - Pinyin
  - Part-of-speech tag
  - Definition
  - Example sentence (Chinese + pinyin + English translation)
- **SRS rating buttons** (shown after every card, all modes):
  - 😰 Super hard → Again (1 min)
  - 😅 Hard → 10 minutes
  - 🙂 Good → 1 day
  - 😄 Easy → 4 days
- **Right sidebar:**
  - Quick flashcard widget
  - Session stats (cards reviewed, accuracy, time, XP earned)
  - Word breakdown panel (character-by-character decomposition)

---

## Design System

### Color Palette

| Token              | Value                    | Usage                                |
| ------------------ | ------------------------ | ------------------------------------ |
| `--milk`           | `#1e3a52`                | Primary text                         |
| `--milk-soft`      | `#4a6c85`                | Muted / secondary text               |
| `--sky`            | `#5aaed4`                | Primary brand blue, buttons, accents |
| `--sky-deep`       | `#3a87b0`                | Hover states, deep accents           |
| `--lavender`       | `#7a9fd4`                | Secondary accent                     |
| `--frost`          | `#e8f4fd`                | Light fill, backgrounds, chips       |
| `--foam`           | `#f7fbfe`                | Near-white surface                   |
| `--bg-base`        | `#e3f3fc`                | Page background                      |
| `--surface`        | `rgba(255,255,255,0.74)` | Glass card backgrounds               |
| `--surface-strong` | `rgba(255,255,255,0.92)` | Stronger glass cards                 |
| `--line`           | `rgba(30,58,82,0.12)`    | Borders and dividers                 |
| `--kicker`         | `rgba(58,135,176,0.9)`   | Uppercase label text                 |

Dark mode variants are defined in the `.dark` class in `style.css` — all tokens invert to deep navy backgrounds with lighter sky/lavender text.

### Typography

| Font              | Use                                   |
| ----------------- | ------------------------------------- |
| **Nunito**        | All UI text — rounded, warm, friendly |
| **Noto Serif SC** | Chinese characters only               |

```css
/* Chinese character example */
font-family: 'Noto Serif SC', serif;
font-size: 72px;
font-weight: 700;
color: var(--sky-deep);
```

### Spacing & Radius

- Base radius: `0.75rem` (defined as `--radius`)
- Pills / buttons: `border-radius: 9999px`
- Cards: `border-radius: var(--radius)` → `0.75rem`
- Larger panels: `calc(var(--radius) + 6px)`

### Shadows

```css
/* Island shell (main card) */
box-shadow:
  0 1px 0 var(--inset-glint) inset,
  0 22px 44px rgba(30, 90, 130, 0.08),
  0 6px 18px rgba(30, 58, 82, 0.07);

/* Feature card */
box-shadow:
  0 1px 0 var(--inset-glint) inset,
  0 18px 34px rgba(30, 90, 130, 0.08),
  0 4px 14px rgba(30, 58, 82, 0.06);
```

---

## Tailwind Usage

Brand tokens are extended in `tailwind.config.ts`. Use them as utility classes:

```tsx
// Backgrounds
<div className="bg-frost">...</div>
<div className="bg-surface-strong">...</div>

// Text
<p className="text-milk">Primary text</p>
<p className="text-milk-soft">Secondary text</p>
<span className="text-sky-deep">Accent</span>

// Buttons
<button className="bg-sky hover:bg-sky-deep text-white rounded-full px-6 py-2 font-bold">
  Study now
</button>

// Borders
<div className="border border-line rounded-lg">...</div>

// Kicker labels
<span className="text-kicker uppercase tracking-widest text-xs font-bold">
  HSK 2
</span>

// Chinese font
<span className="font-chinese text-6xl text-sky-deep">学习</span>
```

For tokens not in `tailwind.config.ts`, use arbitrary value syntax:

```tsx
<div className="bg-[var(--hero-a)]">...</div>
```

---

## File Conventions

```
app/
├── routes/
│   ├── __root.tsx       ← Required root layout
│   ├── index.tsx        ← Landing page (/)
│   ├── dashboard.tsx    ← Dashboard (/dashboard)
│   └── study.tsx        ← Vocab study (/study)
├── router.tsx           ← createRouter() — required
├── client.tsx           ← Client entry — required
└── styles/
    └── style.css        ← All CSS variables + global styles
tailwind.config.ts
```

> ⚠️ `routeTree.gen.ts` is auto-generated by TanStack Start on `bun run dev`. Do not edit it manually. If it goes missing or stale, delete it and restart the dev server.

---

## Known Issues & Fixes

### "Crawling result not available" error (TanStack Start)

This is a router plugin error, **not** a CSS/Tailwind issue. Causes:

1. Missing `app/routes/__root.tsx` or `app/routes/index.tsx`
2. Syntax error in any route file — check terminal output above the browser overlay
3. `app/router.tsx` missing or incorrectly structured
4. `routeTree.gen.ts` missing — run `bun run dev` to regenerate
5. `tanstackStart()` plugin missing from `vite.config.ts`

---

## SRS (Spaced Repetition) Intervals

| Rating       | Interval          |
| ------------ | ----------------- |
| 😰 Super hard | Again in 1 minute |
| 😅 Hard       | 10 minutes        |
| 🙂 Good       | 1 day             |
| 😄 Easy       | 4 days            |

These follow a simplified SM-2-style schedule. Expand with a proper SRS algorithm (e.g. fsrs) when building the backend.
