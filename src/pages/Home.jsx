import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, PRODUCTS } from '../data/products.js'
import ProductArt from '../components/ProductArt.jsx'
import ProductCard from '../components/ProductCard.jsx'

const SLIDES = [
    { title: 'END OF SEASON SALE', sub: 'Min. 50% off on 2,000+ brands', cta: '/shop', bg: 'linear-gradient(120deg,#ff3f6c,#ff905a)', art: ['dress', '#fff'] },
    { title: 'THE DENIM EDIT', sub: 'Fresh fits starting ₹999', cta: '/men', bg: 'linear-gradient(120deg,#1f3a5f,#4a7bb7)', art: ['jeans', '#dfe9f5'] },
    { title: 'GLOW UP', sub: 'Beauty bestsellers up to 40% off', cta: '/beauty', bg: 'linear-gradient(120deg,#6c5ce7,#e17da5)', art: ['perfume', '#fff'] }
]

const OFFERS = [
    { label: 'Flat ₹300 off', note: 'on your first order · code TREND300' },
    { label: '10% instant discount', note: 'on demo bank cards' },
    { label: 'Free shipping', note: 'on orders above ₹799' }
]

export default function Home() {
    const [slide, setSlide] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000)
        return () => clearInterval(t)
    }, [])

    const deals = [...PRODUCTS].sort((a, b) => b.discount - a.discount).slice(0, 10)
    const fresh = PRODUCTS.filter((p) => p.isNew).slice(0, 10)
    const s = SLIDES[slide]

    return (
        <div className="home">
            <section className="hero" style={{ background: s.bg }}>
                <div className="hero-text">
                    <h1>{s.title}</h1>
                    <p>{s.sub}</p>
                    <Link to={s.cta} className="btn-hero">SHOP NOW</Link>
                </div>
                <div className="hero-art">
                    <ProductArt type={s.art[0]} color={s.art[1]} bg="transparent" />
                </div>
                <div className="hero-dots">
                    {SLIDES.map((_, i) => (
                        <button key={i} aria-label={`Slide ${i + 1}`} className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} />
                    ))}
                </div>
            </section>

            <section className="offers">
                {OFFERS.map((o) => (
                    <div key={o.label} className="offer">
                        <strong>{o.label}</strong>
                        <span>{o.note}</span>
                    </div>
                ))}
            </section>

            <h2 className="section-title">SHOP BY CATEGORY</h2>
            <section className="cat-grid">
                {CATEGORIES.map((c) => {
                    const sample = PRODUCTS.find((p) => p.category === c.slug)
                    return (
                        <Link key={c.slug} to={`/${c.slug}`} className="cat-tile" style={{ background: c.color }}>
                            <ProductArt type={sample.type} color={sample.color} bg="transparent" />
                            <strong>{c.name}</strong>
                            <span>{c.tagline}</span>
                            <em>Shop now →</em>
                        </Link>
                    )
                })}
            </section>

            <h2 className="section-title">DEALS OF THE DAY</h2>
            <section className="rail">
                {deals.map((p) => <ProductCard key={p.id} product={p} />)}
            </section>

            <h2 className="section-title">NEW ARRIVALS</h2>
            <section className="rail">
                {fresh.map((p) => <ProductCard key={p.id} product={p} />)}
            </section>
        </div>
    )
}
