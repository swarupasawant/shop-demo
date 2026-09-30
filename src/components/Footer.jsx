import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/products.js'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div>
                    <h4>ONLINE SHOPPING</h4>
                    {CATEGORIES.map((c) => <Link key={c.slug} to={`/${c.slug}`}>{c.name}</Link>)}
                </div>
                <div>
                    <h4>CUSTOMER POLICIES</h4>
                    <span>Contact Us</span>
                    <span>FAQ</span>
                    <span>Terms of Use</span>
                    <span>Privacy Policy</span>
                    <span>Cookie Policy</span>
                </div>
                <div>
                    <h4>100% ORIGINAL</h4>
                    <p>Guaranteed on all products at Trendora.</p>
                    <h4>RETURNS WITHIN 14 DAYS</h4>
                    <p>of receiving your order.</p>
                </div>
                <div>
                    <h4>ABOUT THIS SITE</h4>
                    <p>
                        A fictional storefront for testing cookie consent banners. No products, payments or
                        accounts are real.
                    </p>
                </div>
            </div>
            <div className="footer-bottom">© 2026 Trendora (demo). Test environment only.</div>
        </footer>
    )
}
