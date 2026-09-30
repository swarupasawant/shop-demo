// All data is fake. Product visuals are drawn as inline SVG (ProductArt), so
// the page needs no third-party image host and stays inside the strict CSP.

export const CATEGORIES = [
    { slug: 'men', name: 'Men', tagline: 'Shirts, tees, denim & sneakers', color: '#e0f0ff' },
    { slug: 'women', name: 'Women', tagline: 'Dresses, kurtas, bags & more', color: '#ffe3ec' },
    { slug: 'kids', name: 'Kids', tagline: 'Playful styles for little ones', color: '#fff4d6' },
    { slug: 'beauty', name: 'Beauty', tagline: 'Makeup, skincare & fragrance', color: '#f1e6ff' },
    { slug: 'home-living', name: 'Home & Living', tagline: 'Cushions, lamps & decor', color: '#e2f7ee' }
]

const CATALOG = {
    men: [
        ['tshirt', 'Roadster', 'Men Solid Crew Neck T-shirt', 1299],
        ['shirt', 'HERE&NOW', 'Men Slim Fit Casual Shirt', 1999],
        ['jeans', 'Denimora', 'Men Slim Fit Stretchable Jeans', 2799],
        ['shoes', 'Stridex', 'Men Colourblocked Sneakers', 3999],
        ['watch', 'Tempo', 'Men Analogue Chronograph Watch', 5499],
        ['tshirt', 'Urbano', 'Men Printed Oversized T-shirt', 999],
        ['shirt', 'Linencraft', 'Men Pure Linen Shirt', 2499],
        ['shoes', 'Trailpeak', 'Men Running Shoes', 4599],
        ['jacket', 'Northline', 'Men Padded Bomber Jacket', 4999]
    ],
    women: [
        ['dress', 'Aurelle', 'Women Floral A-Line Midi Dress', 2499],
        ['kurta', 'Saanjh', 'Women Printed Straight Kurta', 1599],
        ['bag', 'Carrya', 'Women Structured Handheld Bag', 3299],
        ['dress', 'Mauve Lane', 'Women Fit & Flare Dress', 1899],
        ['heels', 'Solea', 'Women Block Heels', 2199],
        ['kurta', 'Rangmahal', 'Women Embroidered Anarkali Kurta', 2999],
        ['jeans', 'Denimora', 'Women High-Rise Wide Leg Jeans', 2599],
        ['watch', 'Tempo', 'Women Rose Gold Analogue Watch', 4299],
        ['top', 'Vero Bella', 'Women Ruffled Top', 1199]
    ],
    kids: [
        ['tshirt', 'LittleLoop', 'Boys Graphic Printed T-shirt', 699],
        ['dress', 'Tinytales', 'Girls Tiered Fit & Flare Dress', 1199],
        ['shoes', 'Hopscotch', 'Kids Velcro Sneakers', 1499],
        ['jacket', 'Cubwear', 'Boys Hooded Puffer Jacket', 1999],
        ['tshirt', 'LittleLoop', 'Girls Striped T-shirt', 599],
        ['bag', 'Backpack Co', 'Kids Printed School Backpack', 1299]
    ],
    beauty: [
        ['lipstick', 'Lumiere', 'Matte Liquid Lipstick', 649],
        ['perfume', 'Oudh & Co', 'Eau de Parfum 100ml', 2899],
        ['cream', 'Dermalea', 'Vitamin C Day Cream 50g', 799],
        ['lipstick', 'Velvetine', 'Creamy Bullet Lipstick', 499],
        ['perfume', 'Noir Bloom', 'Women Eau de Toilette 50ml', 1899],
        ['cream', 'Hydrasoft', 'Ceramide Night Moisturiser', 999]
    ],
    'home-living': [
        ['cushion', 'Nestory', 'Set of 2 Cushion Covers', 899],
        ['lamp', 'Glowhaus', 'Ceramic Table Lamp', 2499],
        ['cushion', 'Loom Tales', 'Handwoven Boho Cushion Cover', 699],
        ['lamp', 'Lumen Nook', 'Metal Floor Lamp', 5999],
        ['mug', 'Claycraft', 'Set of 4 Ceramic Mugs', 1099],
        ['mug', 'Brewtiful', 'Printed Coffee Mug 350ml', 399]
    ]
}

const PALETTE = ['#1f3a5f', '#c0392b', '#2e7d6b', '#e6a23c', '#6c5ce7', '#2d3436', '#e17da5', '#00838f', '#8d6e63', '#f5f5f5']
const DISCOUNTS = [0, 10, 20, 30, 40, 50, 60, 70]

// Deterministic pseudo-random so every reload shows identical data.
function seeded(n) {
    const x = Math.sin(n * 9301 + 49297) * 233280
    return x - Math.floor(x)
}

let id = 1000
export const PRODUCTS = Object.entries(CATALOG).flatMap(([category, items]) =>
    items.map(([type, brand, name, mrp], i) => {
        id += 1
        const r = seeded(id)
        const discount = DISCOUNTS[Math.floor(r * DISCOUNTS.length)]
        return {
            id,
            category,
            type,
            brand,
            name,
            mrp,
            discount,
            price: Math.round((mrp * (100 - discount)) / 100),
            rating: (3.6 + seeded(id + 7) * 1.3).toFixed(1),
            ratingCount: Math.floor(seeded(id + 3) * 9000) + 40,
            color: PALETTE[(i + category.length) % PALETTE.length],
            isNew: seeded(id + 11) > 0.75
        }
    })
)

export const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))].sort()

export const PRICE_RANGES = [
    { id: 'u500', label: 'Under ₹500', min: 0, max: 499 },
    { id: '500-1000', label: '₹500 to ₹1,000', min: 500, max: 1000 },
    { id: '1000-2000', label: '₹1,000 to ₹2,000', min: 1001, max: 2000 },
    { id: '2000-4000', label: '₹2,000 to ₹4,000', min: 2001, max: 4000 },
    { id: 'o4000', label: 'Above ₹4,000', min: 4001, max: Infinity }
]

export const formatINR = (n) => '₹' + n.toLocaleString('en-IN')
