# Mordyn — E-Commerce Storefront

A modern, responsive e-commerce frontend built with React and Vite. Mordyn lets users browse a product catalog, filter by category and price, sort listings, and manage a shopping cart.

## Features

- **Product catalog** — 16 products across Electronics, Accessories, Bags, and Clothes categories
- **Filtering & sorting** — filter by category, set a price range, and sort by popularity, price, or newest
- **Shopping cart** — add/remove items with a persistent cart context
- **Responsive layout** — mobile-first design using Tailwind CSS
- **Smooth animations** — powered by Framer Motion
- **Client-side routing** — Home, Shop, and Cart pages via React Router

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Dev server & bundler |
| Tailwind CSS 4 | Styling |
| React Router 7 | Client-side routing |
| Framer Motion | Animations |
| Lucide React | Icons |

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx       # Navigation bar with cart icon
│   └── Footer.jsx       # Site footer
├── context/
│   └── CartContext.jsx  # Global cart state
├── lib/
│   └── product.js       # Product data
└── pages/
    ├── Home.jsx         # Landing page
    ├── Shop.jsx         # Full catalog with filters
    └── CartPage.jsx     # Cart review & checkout
```

## Pages

- `/` or `/home` — Hero section and featured products
- `/shop` — Full catalog with category filter, price range slider, and sort dropdown
- `/cart` — Cart summary with item management
