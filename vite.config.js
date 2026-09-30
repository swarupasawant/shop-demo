import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ---------------------------------------------------------------------------
// CSP nonce toggle
//
// ENABLE_CSP = true   serve a strict Content-Security-Policy (nonce +
//                     'strict-dynamic', no unsafe-inline), like a real client
//                     running a nonce policy.
// ENABLE_CSP = false  no policy at all. The banner must behave the same.
//
// Without editing this file: `npm run dev:nocsp` / `npm run build:nocsp`
// (or CSP=off in the environment) turns it off for that run.
// ---------------------------------------------------------------------------
const ENABLE_CSP = true

// Fixed on purpose: the tag copied from the dashboard may carry this literal
// value, and GitHub Pages cannot mint a nonce per response anyway. A real
// client mints a fresh CSPRNG nonce server side for every response.
const NONCE = 'EDN9X8++t9iaowoNsOS+Ag=='

// Extra origins the banner may talk to besides the host it is loaded from
// (API, consent logging, preference-centre iframe). Add more here if the
// console shows a CSP violation for a Privy origin.
const EXTRA_BANNER_ORIGINS = [
    'https://privy.idfystaging.com',
    'https://cookie-manager.pyxis.privybyidfy.app'
]

// Local Privy backend, dev only.
const LOCAL_BACKEND = 'http://127.0.0.1:3001'

const cspEnabled = ENABLE_CSP && process.env.CSP !== 'off'

function bannerOrigins(html) {
    const origins = new Set(EXTRA_BANNER_ORIGINS)
    for (const m of html.matchAll(/<script[^>]*\bsrc="(https?:\/\/[^"]+)"/g)) {
        if (m[1].includes('cookie-banner')) {
            origins.add(new URL(m[1]).origin)
        }
    }
    return [...origins].join(' ')
}

function policy(nonce, origins, dev) {
    const extra = dev ? ` ws: ${LOCAL_BACKEND}` : ''
    return [
        "default-src 'self'",
        `script-src 'nonce-${nonce}' 'strict-dynamic'`,
        `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com ${origins}`,
        `font-src 'self' https://fonts.gstatic.com data: ${origins}`,
        `connect-src 'self' ${origins}${extra}`,
        `img-src 'self' data: https://images.unsplash.com ${origins}`,
        `frame-src 'self' ${origins}${dev ? ' ' + LOCAL_BACKEND : ''}`,
        "object-src 'none'",
        "base-uri 'none'"
    ].join('; ')
}

function strictCsp() {
    let origins = EXTRA_BANNER_ORIGINS.join(' ')
    return {
        name: 'shop-demo-strict-csp',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                // Dev carries the policy in a real response header.
                res.setHeader('Content-Security-Policy', policy(NONCE, origins, true))
                next()
            })
        },
        transformIndexHtml: {
            order: 'post',
            handler(html, ctx) {
                origins = bannerOrigins(html)

                // The banner tag is excluded from the blanket nonce rule so
                // the un-nonced case can be tested by deleting its attribute.
                // Only the placeholders opt it in.
                const out = html
                    .replace(/__PRIVY_NONCE__|YOUR_NONCE/g, NONCE)
                    .replace(/<script(?![^>]*\bnonce=)(?![^>]*cookie-banner)/g, `<script nonce="${NONCE}"`)
                    .replace(/<style(?![^>]*\bnonce=)/g, `<style nonce="${NONCE}"`)
                    // Vite's client reads this to nonce the <style> tags it
                    // injects for CSS imported from JS.
                    .replace(/(<meta charset[^>]*>)/i, `$1\n  <meta property="csp-nonce" nonce="${NONCE}">`)

                if (ctx.server) {
                    return out
                }
                // GitHub Pages cannot send headers, so the build declares the
                // policy in a meta tag.
                return out.replace(
                    /(<meta charset[^>]*>)/i,
                    `$1\n  <meta http-equiv="Content-Security-Policy" content="${policy(NONCE, origins, false)}">`
                )
            }
        }
    }
}

// With CSP off the placeholder is left as is. Harmless: a nonce attribute is
// only consulted when a policy names one.
export default defineConfig(({ command }) => ({
    plugins: cspEnabled ? [react(), strictCsp()] : [react()],
    // GitHub Pages serves the site under /<repo>/. Set BASE_PATH=/ for a
    // custom domain.
    base: command === 'build' ? (process.env.BASE_PATH || '/shop-demo/') : '/'
}))
