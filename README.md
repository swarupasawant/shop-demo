# Trendora: E-commerce Cookie Banner Test Site

A fictional Myntra-style fashion store (React + Vite) for testing the Privy cookie consent banner on a realistic
multi-page shopping site. Nothing on it is real: no payments, no accounts.

Product photos are free [Unsplash](https://unsplash.com/license) images, hotlinked from `images.unsplash.com`
(mapped per product in [`src/data/photos.js`](src/data/photos.js)). If a photo fails to load, the card falls back
to a built-in SVG drawing. To change a photo, replace its `photo-…` id in that file.

Live: https://swarupasawant.github.io/shop-demo/

## Swap the cookie banner

1. Open [`index.html`](index.html).
2. Replace the `<script>` tag between the `COOKIE BANNER` markers with the tag copied from the Privy dashboard.
3. Commit and push to `main`. GitHub Actions rebuilds and deploys it in about a minute.

That is the only file you need to touch. The banner's origin is read from the `src` and allowed in the CSP
automatically. If the console shows a CSP violation for some other Privy origin, add it to
`EXTRA_BANNER_ORIGINS` in [`vite.config.js`](vite.config.js).

## Run locally

```bash
npm install
npm run dev          # strict CSP on  -> http://localhost:5173
```

## CSP nonce testing

Controlled by which `export default` at the bottom of [`vite.config.js`](vite.config.js) is uncommented (strict CSP, or none). The Privy test automation switches it for you.

| Setting | What the page gets |
| --- | --- |
| CSP on (default) | `script-src 'nonce-…' 'strict-dynamic'`, no `unsafe-inline`. Dev sends it as a real header; the Pages build uses a `<meta>` tag (Pages can't send headers). |
| CSP off | No policy. The banner should behave exactly the same. |

Nonce cases on the banner tag:

- `nonce="__PRIVY_NONCE__"` or `nonce="YOUR_NONCE"`: replaced with the page nonce. The banner loads.
- A literal `nonce="EDN9X8++t9iaowoNsOS+Ag=="` (the fixed demo nonce): also loads.
- No `nonce` attribute: the banner tag is never auto-nonced, so under CSP on it should be **blocked**.

The nonce is fixed on purpose so a tag pasted from the dashboard keeps working. A real client mints a fresh one on
every response.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero carousel, offers, category tiles, deals and new-arrivals rails |
| `/men`, `/women`, `/kids`, `/beauty`, `/home-living` | Category listing with brand, price and discount filters and sorting |
| `/shop`, `/shop?q=jeans` | All products and search |
| anything else | 404 (served via `404.html` on Pages) |

The bag and wishlist are stored in `localStorage` (`trendora_bag`, `trendora_wishlist`), so you can check that the
banner leaves first-party storage alone across reloads and page changes.

Each route is a real file in the build (`scripts/make-routes.mjs`), so every page returns a 200 with a fresh
banner load. If you add a category, add its slug to `ROUTES` in that script.

## Deploy

On every push to `main`, `.github/workflows/deploy.yml` builds with `BASE_PATH=/<repo-name>/` and publishes to
GitHub Pages. One-time setup: in the repo go to **Settings → Pages → Source** and select **GitHub Actions**.

For a custom domain, add a `public/CNAME` file and change the build env in the workflow to `BASE_PATH: /`.
