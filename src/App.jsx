import { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { ShopProvider } from './ShopContext.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Category from './pages/Category.jsx'

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

function NotFound() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>We couldn&apos;t find that page.</p>
            <Link to="/" className="btn-primary">Continue shopping</Link>
        </div>
    )
}

export default function App() {
    return (
        <ShopProvider>
            <ScrollToTop />
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Category />} />
                    <Route path="/:slug" element={<Category />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </ShopProvider>
    )
}
