# HVAC Site Grader — Design Notes

A single-purpose landing page for a free tool that analyzes an HVAC company's website and returns a health score. The entire page is one viewport — no scroll, no marketing, no footer. It should read as a tool, not a pitch.

---

## Principles

1. **One job per screen.** The page exists to get a business name into the input. Everything else is supporting cast.
2. **Restraint over decoration.** Whitespace is the primary visual element. No hero imagery, no gradients, no feature grid.
3. **Confidence, not enthusiasm.** Tone is plain and direct. We don't sell — we ask one question and provide one input.
4. **The input is the hero.** It's the largest interactive element and the only thing styled with the accent color.

---

## Layout

- Full-viewport stage, content vertically and horizontally centered.
- Single column, max-width **720px**.
- Small wordmark anchored top-left (28px from top, 32px from left). It exists for orientation, not navigation.
- Vertical rhythm inside the panel:
  - Headline
  - 18px gap
  - Subheadline
  - 36px gap
  - Search input
  - 24px gap
  - Suggested chips
  - 28px gap
  - Micro reassurance line

Everything sits above the fold at 1024×768 and up. Mobile collapses the micro line and tightens type.

---

## Color

Warm neutral palette with a single deep-orange accent. Avoid cool grays — the warmth makes the page feel approachable and "small business" rather than "SaaS dashboard."

| Token             | Value                  | Use                                        |
| ----------------- | ---------------------- | ------------------------------------------ |
| `--bg`            | `#FBFAF7`              | Page background (warm near-white)          |
| `--surface`       | `#F2EFE9`              | Search input resting state                 |
| `--surface-hover` | `#ECE8E0`              | Hover surfaces                             |
| `--hairline`      | `#E6E1D8`              | Chip borders, focus ring outline           |
| `--ink`           | `#1A1714`              | Primary text, wordmark                     |
| `--ink-soft`      | `#5C564E`              | Subheadline, chip icons                    |
| `--ink-mute`      | `#8E867C`              | Placeholder text, micro copy, wordmark dot |
| `--accent`        | `#C2410C`              | Submit button, mark inner dot              |
| `--accent-hover`  | `#9A3309`              | Submit hover                               |
| `--focus-ring`    | `rgba(194,65,12,0.18)` | Input focus glow                           |

The accent is used **exactly twice**: the submit button fill and a tiny dot inside the wordmark. Nothing else competes for attention.

---

## Typography

**Instrument Sans** for everything, with **JetBrains Mono** reserved for two small utility marks (the wordmark suffix area and the micro reassurance line). Helvetica Neue is the system fallback.

| Element      | Size                        | Weight | Tracking   | Notes                     |
| ------------ | --------------------------- | ------ | ---------- | ------------------------- |
| Headline     | `clamp(34px, 4.6vw, 54px)`  | 500    | `-0.028em` | `text-wrap: balance`      |
| Subheadline  | `clamp(15px, 1.25vw, 17px)` | 400    | normal     | `text-wrap: pretty`, soft |
| Search input | 17px                        | 400    | normal     | 16px on mobile (no zoom)  |
| Wordmark     | 15px                        | 600    | `-0.005em` |                           |
| Chip label   | 14px                        | 400    | normal     |                           |
| Micro line   | 11px mono                   | 500    | `0.04em`   | Uppercase                 |

Headline weight is **500, not 700**. Heavy weights read as marketing; medium reads as a tool's question.

---

## Components

### Wordmark

Two concentric circles — an outline ring and a small filled accent dot inside (the dot is the only place outside the submit button where the accent shows up). The mark + name sit together at 22px × ~15px label height.

### Search input

- Pill shape (`border-radius: 999px`).
- Resting state: tinted warm surface, no border.
- Focus state: background flips to pure white, gains a 1px hairline + 5px soft amber focus ring.
- Submit button is a 48px amber circle inside the pill, right-aligned with 6px padding inset.
- Submit icon is a simple **up-arrow** (the universal "send/submit" verb), not a magnifying glass — this is a query, not a search.

### Chips

- Transparent fill, 1px hairline border, 999px radius.
- 14px label, 14px icon at `--ink-soft`.
- Hover: warm surface fill + slightly darker border.
- Three chips in a single wrapping row, gap 10px.

### Micro reassurance line

Tiny mono caption with a green status dot. Communicates "no signup, ~20 seconds" without taking up real estate. Hidden on mobile.

---

## Interaction

- Clicking a chip writes its label into the input and focuses it. No navigation, no separate flow — chips are accelerators, not categories.
- Submit is a no-op stub (this is a static landing page).
- Focus styles use the amber ring; tab order is: input → submit → chip 1 → chip 2 → chip 3.

---

## What we deliberately left out

- Navigation bar
- Footer
- Feature list / benefits / "how it works"
- Testimonials, logos, social proof
- Hero illustration
- Secondary CTA
- Dark mode (the warmth is the whole point)

If a future version needs more, it goes on the **results page**, not here.
