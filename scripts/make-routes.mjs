/**
 * GitHub Pages has no rewrite rules, so /shop-demo/men/ is a 404 unless a
 * file exists there. After `vite build` this copies dist/index.html to:
 *
 *   dist/<route>/index.html  a real 200 for every known route, so the banner
 *                            loads on a clean response on each page
 *   dist/404.html            fallback for anything else; keeps the URL and
 *                            the client router renders the not-found page
 *
 * Keep ROUTES in sync with src/data/products.js CATEGORIES.
 */
import { mkdirSync, copyFileSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROUTES = [
    'shop', 'men', 'women', 'kids', 'beauty', 'home-living',
    // Banner language auto-selection (URL-path detection) — privyauto cookie-manager tests.
    // Real 200 pages so the banner loads on a clean response for each language path,
    // including the ISO-collision edge cases (brx, sat) and the must-NOT-match ones (br, st).
    'hindi', 'hi', 'gujarati', 'gu', 'marathi', 'mr', 'tamil', 'ta',
    'brx', 'sat', 'br', 'st'
]

const dist = resolve('dist')
const index = join(dist, 'index.html')
if (!existsSync(index)) {
    console.error('dist/index.html not found. Run vite build first.')
    process.exit(1)
}

for (const route of ROUTES) {
    mkdirSync(join(dist, route), { recursive: true })
    copyFileSync(index, join(dist, route, 'index.html'))
}
copyFileSync(index, join(dist, '404.html'))
console.log(`Created ${ROUTES.length} route pages + 404.html`)
