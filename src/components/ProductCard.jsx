import ProductArt from './ProductArt.jsx'
import { formatINR } from '../data/products.js'
import { useShop } from '../ShopContext.jsx'

export default function ProductCard({ product: p }) {
    const { wishlist, addToBag, toggleWishlist } = useShop()
    const saved = wishlist.includes(p.id)

    return (
        <article className="card" data-product-id={p.id}>
            <div className="card-media">
                <ProductArt type={p.type} color={p.color} />
                {p.isNew && <span className="tag-new">NEW</span>}
                <span className="card-rating">{p.rating} ★ <i>| {p.ratingCount.toLocaleString('en-IN')}</i></span>
                <div className="card-hover">
                    <button className={`btn-wish ${saved ? 'saved' : ''}`} onClick={() => toggleWishlist(p)}>
                        {saved ? '♥ WISHLISTED' : '♡ WISHLIST'}
                    </button>
                    <button className="btn-bag" onClick={() => addToBag(p)}>ADD TO BAG</button>
                </div>
            </div>
            <div className="card-body">
                <h3>{p.brand}</h3>
                <p className="card-name">{p.name}</p>
                <p className="card-price">
                    <strong>{formatINR(p.price)}</strong>
                    {p.discount > 0 && (
                        <>
                            <s>{formatINR(p.mrp)}</s>
                            <em>({p.discount}% OFF)</em>
                        </>
                    )}
                </p>
            </div>
        </article>
    )
}
