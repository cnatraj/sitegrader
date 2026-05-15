# HVAC Site Grader — Project Context for Claude

## What This Is

A free web tool that analyzes an HVAC company's website and returns an AI-powered health score out of 100. The goal is to show HVAC business owners what's broken on their site and what it's costing them in lost leads.

**Business model:** Freemium. The basic score is free with no signup. A "Get Full Report" CTA (priced at $19.99) is shown after the score. For MVP, clicking that button shows a fake-door message and captures an email — this tests willingness to pay before the paid tier is built.

**Experiment goal:** Track how many users click the paid CTA vs. how many complete the free report. That click-through rate validates whether to build the paid tier.

---

## Tech Stack

- **Framework:** Nuxt 3 (Vue 3 Composition API)
- **Styling:** Tailwind CSS
- **Language:** JavaScript (no TypeScript)
- **Package manager:** npm
  Always use:
- `<script setup>` syntax in Vue components
- Composition API (`ref`, `computed`, `watch`, `onMounted`)
- Tailwind utility classes for all styling — no custom CSS files unless absolutely necessary
- `useFetch` or `$fetch` for API calls within Nuxt

## Additional information

read additional documentation available in /docs

## What NOT to Build in MVP

- User accounts or login
- Payment processing (Stripe comes later, after fake door validates demand)
- PDF report generation
- Competitor comparison (requires GBP scraping)
- Email marketing integration (just save the email for now)
- Multiple industries (HVAC only until validated)
