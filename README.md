# Vireon Website

Static, multi-page marketing site for Vireon — dark/cyan liquid-glass design system, full on-page SEO
(meta tags, Open Graph, Twitter Cards, JSON-LD structured data, image SEO), and a Vireon Ultimate
premium plan page.

## Structure

```
index.html              Home — hero, about, market stats, feature spotlights, ways to earn,
                         Vireon Ultimate, financial tools, how it works, FAQ, CTA
register.html            Registration form
signup.html               Quick-start signup form (redirects into register.html)
how-to-register.html      Long-form step-by-step registration guide (HowTo schema)
payments.html              Pricing: registration fee + Vireon Ultimate, payment methods, withdrawals
vireon-platform.html        "Is Vireon legit?" trust & safety guide
upgrade-vireon.html         Dedicated Vireon Ultimate (₦15,000) upsell page with comparison table

assets/
  css/vireon-premium.css    Shared design system (all pages)
  js/vireon-app.js           Shared JS: theme toggle, scroll reveal, FAQ accordion, mobile nav
  images/                     Compressed JPGs used across the site
  icons/                       Full favicon/app-icon set generated from assets/logo.svg
  logo.svg                     Vireon "V" mark (source for all icons)

robots.txt, sitemap.xml (with image sitemap entries), manifest.webmanifest, browserconfig.xml, llms.txt, CNAME
```

## Before you deploy

1. **Domain** — every page's canonical/OG/JSON-LD URLs and the `CNAME` file use the placeholder
   `vireonwebsite.com.ng`. If that isn't the real domain, find-and-replace `vireonwebsite.com.ng` across
   all `.html`, `.xml`, `.txt`, and `CNAME` with the actual domain.
2. **Support email** — `support@vireonwebsite.com.ng` appears in the Organization schema and footer;
   update if different.
3. **Forms** — `register.html` and `signup.html` are front-end only (no backend wired up yet).
   Point the `<form>` actions / add JS at your real registration API.
4. **Payment amounts** — the one-time registration fee is referenced generically ("one-time
   registration fee"); the exact Naira amount isn't filled in anywhere except Vireon Ultimate
   (₦15,000). Add the standard fee once it's finalized (payments.html, register.html, how-to-register.html).
5. **Social links** — footer social icons (X / Instagram / TikTok) point to `#`; add real URLs.

## Deploying to GitHub Pages

1. Push this folder's contents to the root of your repo (or `main` branch).
2. In repo Settings → Pages, set the source to the branch/root.
3. Because `CNAME` is included, GitHub Pages will serve the custom domain automatically once your
   DNS is pointed at GitHub — update the `CNAME` file first if the domain differs.

## Local preview

Any static file server works, e.g.:

```
npx serve .
# or
python3 -m http.server 8080
```
