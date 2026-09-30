import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// Bag and wishlist live in localStorage so they survive reloads, which is
// handy when checking that the banner doesn't wipe first-party storage.
const ShopContext = createContext(null)

function load(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || []
    } catch {
        return []
    }
}

function usePersisted(key) {
    const [value, setValue] = useState(() => load(key))
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch {
            // storage blocked; keep in memory only
        }
    }, [key, value])
    return [value, setValue]
}

export function ShopProvider({ children }) {
    const [bag, setBag] = usePersisted('trendora_bag')
    const [wishlist, setWishlist] = usePersisted('trendora_wishlist')
    const [toast, setToast] = useState(null)
    const timer = useRef()

    const notify = useCallback((msg) => {
        clearTimeout(timer.current)
        setToast(msg)
        timer.current = setTimeout(() => setToast(null), 2200)
    }, [])

    const addToBag = (product) => {
        setBag((b) => [...b, product.id])
        notify(`Added to bag: ${product.brand} ${product.name}`)
    }

    const toggleWishlist = (product) => {
        const saved = wishlist.includes(product.id)
        setWishlist((w) => (saved ? w.filter((x) => x !== product.id) : [...w, product.id]))
        notify(saved ? 'Removed from wishlist' : 'Saved to wishlist')
    }

    return (
        <ShopContext.Provider value={{ bag, wishlist, addToBag, toggleWishlist, notify }}>
            {children}
            {toast && <div className="toast" role="status">{toast}</div>}
        </ShopContext.Provider>
    )
}

export const useShop = () => useContext(ShopContext)
