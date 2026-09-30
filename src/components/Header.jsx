import { useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '../data/products.js'
import { useShop } from '../ShopContext.jsx'

const Icon = ({ d }) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
)

export default function Header() {
    const { bag, wishlist, notify } = useShop()
    const [params] = useSearchParams()
    const [q, setQ] = useState(params.get('q') || '')
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const search = (e) => {
        e.preventDefault()
        navigate(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : '/shop')
    }

    return (
        <header className="header">
            <div className="announce">FREE delivery on orders above ₹799 · Easy 14-day returns · Demo store, nothing is real</div>
            <div className="header-inner">
                <button className="menu-btn" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
                    <Icon d="M3 6h18M3 12h18M3 18h18" />
                </button>
                <Link to="/" className="logo">
                    <span className="logo-mark">T</span>
                    <span className="logo-text">Trendora</span>
                </Link>
                <nav className={`nav ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
                    {CATEGORIES.map((c) => (
                        <NavLink key={c.slug} to={`/${c.slug}`}>{c.name.toUpperCase()}</NavLink>
                    ))}
                    <NavLink to="/shop" end>ALL</NavLink>
                </nav>
                <form className="search" onSubmit={search} role="search">
                    <Icon d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.3-4.3" />
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search for products, brands and more"
                        aria-label="Search"
                    />
                </form>
                <div className="header-actions">
                    <button onClick={() => notify('Profile is not part of this demo')}>
                        <Icon d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" />
                        <span>Profile</span>
                    </button>
                    <button onClick={() => notify(`${wishlist.length} item(s) in wishlist`)}>
                        <Icon d="M12 21s-7-4.5-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 6C19 16.5 12 21 12 21z" />
                        <span>Wishlist</span>
                        {wishlist.length > 0 && <b className="badge">{wishlist.length}</b>}
                    </button>
                    <button onClick={() => notify(`${bag.length} item(s) in bag`)}>
                        <Icon d="M6 7h12l1 14H5zM9 7a3 3 0 0 1 6 0" />
                        <span>Bag</span>
                        {bag.length > 0 && <b className="badge">{bag.length}</b>}
                    </button>
                </div>
            </div>
        </header>
    )
}
