import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { BRANDS, CATEGORIES, PRICE_RANGES, PRODUCTS } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

const SORTS = {
    recommended: { label: 'Recommended', fn: (a, b) => a.id - b.id },
    new: { label: "What's New", fn: (a, b) => b.isNew - a.isNew },
    discount: { label: 'Better Discount', fn: (a, b) => b.discount - a.discount },
    low: { label: 'Price: Low to High', fn: (a, b) => a.price - b.price },
    high: { label: 'Price: High to Low', fn: (a, b) => b.price - a.price },
    rating: { label: 'Customer Rating', fn: (a, b) => b.rating - a.rating }
}

function toggle(list, value) {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

// Keyed on route + query so filters reset when switching category or search.
export default function Category() {
    const { slug } = useParams()
    const [params] = useSearchParams()
    return <Listing key={`${slug}|${params.get('q')}`} slug={slug} params={params} />
}

function Listing({ slug, params }) {
    const q = (params.get('q') || '').toLowerCase()
    const category = CATEGORIES.find((c) => c.slug === slug)

    const [brands, setBrands] = useState([])
    const [prices, setPrices] = useState([])
    const [minDiscount, setMinDiscount] = useState(0)
    const [sort, setSort] = useState('recommended')
    const [filtersOpen, setFiltersOpen] = useState(false)

    const base = useMemo(
        () =>
            PRODUCTS.filter((p) => !category || p.category === category.slug).filter(
                (p) => !q || `${p.brand} ${p.name} ${p.type} ${p.category}`.toLowerCase().includes(q)
            ),
        [category, q]
    )

    const visible = base
        .filter((p) => brands.length === 0 || brands.includes(p.brand))
        .filter((p) => prices.length === 0 || PRICE_RANGES.some((r) => prices.includes(r.id) && p.price >= r.min && p.price <= r.max))
        .filter((p) => p.discount >= minDiscount)
        .sort(SORTS[sort].fn)

    const availableBrands = BRANDS.filter((b) => base.some((p) => p.brand === b))
    const clear = () => {
        setBrands([])
        setPrices([])
        setMinDiscount(0)
    }

    if (slug && !category) {
        return (
            <div className="not-found">
                <h1>404</h1>
                <p>No category called “{slug}”.</p>
                <Link to="/shop" className="btn-primary">Browse all products</Link>
            </div>
        )
    }

    const title = category ? category.name : q ? `Results for “${params.get('q')}”` : 'All Products'

    return (
        <div className="listing">
            <div className="crumbs">
                <Link to="/">Home</Link> / <span>{category ? category.name : 'Shop'}</span>
            </div>
            <div className="listing-head">
                <h1>
                    {title} <span>- {visible.length} items</span>
                </h1>
                <div className="listing-tools">
                    <button className="filter-toggle" onClick={() => setFiltersOpen((o) => !o)}>FILTERS</button>
                    <label className="sort">
                        Sort by:
                        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                            {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                        </select>
                    </label>
                </div>
            </div>

            <div className="listing-body">
                <aside className={`filters ${filtersOpen ? 'open' : ''}`}>
                    <div className="filters-head">
                        <strong>FILTERS</strong>
                        <button onClick={clear}>CLEAR ALL</button>
                    </div>
                    {!category && (
                        <fieldset>
                            <legend>CATEGORIES</legend>
                            {CATEGORIES.map((c) => <Link key={c.slug} to={`/${c.slug}`} className="filter-link">{c.name}</Link>)}
                        </fieldset>
                    )}
                    <fieldset>
                        <legend>BRAND</legend>
                        {availableBrands.map((b) => (
                            <label key={b}>
                                <input type="checkbox" checked={brands.includes(b)} onChange={() => setBrands(toggle(brands, b))} />
                                {b}
                            </label>
                        ))}
                    </fieldset>
                    <fieldset>
                        <legend>PRICE</legend>
                        {PRICE_RANGES.map((r) => (
                            <label key={r.id}>
                                <input type="checkbox" checked={prices.includes(r.id)} onChange={() => setPrices(toggle(prices, r.id))} />
                                {r.label}
                            </label>
                        ))}
                    </fieldset>
                    <fieldset>
                        <legend>DISCOUNT RANGE</legend>
                        {[0, 10, 30, 50, 70].map((d) => (
                            <label key={d}>
                                <input type="radio" name="discount" checked={minDiscount === d} onChange={() => setMinDiscount(d)} />
                                {d === 0 ? 'Any' : `${d}% and above`}
                            </label>
                        ))}
                    </fieldset>
                </aside>

                <section className="grid">
                    {visible.length === 0 ? (
                        <div className="empty">
                            <p>No products match these filters.</p>
                            <button className="btn-primary" onClick={clear}>Clear filters</button>
                        </div>
                    ) : (
                        visible.map((p) => <ProductCard key={p.id} product={p} />)
                    )}
                </section>
            </div>
        </div>
    )
}
