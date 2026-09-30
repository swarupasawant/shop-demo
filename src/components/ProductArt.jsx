// Simple flat illustrations per product type, tinted with the product colour.
const SHAPES = {
    tshirt: (c) => <path fill={c} d="M70 40l30-15h40l30 15 25 30-25 18-12-12v100H77V76L65 88 40 70z" />,
    shirt: (c) => (
        <g>
            <path fill={c} d="M72 38l28-13 20 18 20-18 28 13 22 36-24 14-10-14v100H84V74L74 88 50 74z" />
            <path fill="#fff" opacity=".6" d="M120 43v140" stroke="#fff" strokeWidth="2" />
            {[70, 100, 130, 160].map((y) => <circle key={y} cx="124" cy={y} r="3" fill="#fff" opacity=".8" />)}
        </g>
    ),
    top: (c) => <path fill={c} d="M88 35h64l10 30-12 8 18 110H72L90 73l-12-8z" />,
    jacket: (c) => (
        <g>
            <path fill={c} d="M70 40l30-15 20 10 20-10 30 15 22 60-22 6v84H70v-84l-22-6z" />
            <path d="M120 35v155" stroke="#000" strokeOpacity=".25" strokeWidth="3" />
        </g>
    ),
    dress: (c) => <path fill={c} d="M100 25h40l-5 35 15 20 35 110H55L90 80l15-20z" />,
    kurta: (c) => (
        <g>
            <path fill={c} d="M85 30l20-8h30l20 8 30 30-18 14-10-10 12 126H71l12-126-10 10-18-14z" />
            <path d="M120 30v50" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeDasharray="4 4" />
        </g>
    ),
    jeans: (c) => <path fill={c} d="M82 25h76l12 170h-36l-14-120-14 120H70z" />,
    shoes: (c) => (
        <g>
            <path fill={c} d="M40 140c10-30 40-40 60-40l20 25c25 5 60 5 80 20v20H40z" />
            <rect x="38" y="160" width="164" height="14" rx="6" fill="#fff" stroke="#ccc" />
        </g>
    ),
    heels: (c) => (
        <g>
            <path fill={c} d="M50 150c30-50 70-60 100-60l40 50v12H150c-20-30-60-15-90 0z" />
            <rect x="178" y="150" width="10" height="40" fill={c} />
        </g>
    ),
    watch: (c) => (
        <g>
            <rect x="102" y="20" width="36" height="180" rx="8" fill={c} />
            <circle cx="120" cy="110" r="42" fill="#fafafa" stroke={c} strokeWidth="10" />
            <path d="M120 110V82M120 110l18 10" stroke="#333" strokeWidth="4" strokeLinecap="round" />
        </g>
    ),
    bag: (c) => (
        <g>
            <path d="M90 80c0-40 60-40 60 0" fill="none" stroke={c} strokeWidth="10" />
            <rect x="60" y="78" width="120" height="110" rx="14" fill={c} />
            <rect x="105" y="100" width="30" height="12" rx="3" fill="#fff" opacity=".7" />
        </g>
    ),
    lipstick: (c) => (
        <g>
            <path fill={c} d="M100 40l40-15v65h-40z" />
            <rect x="92" y="90" width="56" height="30" fill="#d4af37" />
            <rect x="88" y="120" width="64" height="75" rx="6" fill="#222" />
        </g>
    ),
    perfume: (c) => (
        <g>
            <rect x="108" y="30" width="24" height="26" fill="#d4af37" />
            <rect x="70" y="56" width="100" height="135" rx="22" fill={c} opacity=".85" />
            <rect x="92" y="100" width="56" height="40" rx="4" fill="#fff" opacity=".8" />
        </g>
    ),
    cream: (c) => (
        <g>
            <rect x="62" y="70" width="116" height="28" rx="8" fill="#eee" stroke="#ccc" />
            <rect x="56" y="96" width="128" height="90" rx="14" fill={c} />
            <rect x="86" y="125" width="68" height="28" rx="4" fill="#fff" opacity=".8" />
        </g>
    ),
    cushion: (c) => (
        <g>
            <path fill={c} d="M50 55q70-20 140 0q-15 55 0 110q-70 20-140 0q15-55 0-110z" />
            <circle cx="120" cy="110" r="22" fill="#fff" opacity=".5" />
        </g>
    ),
    lamp: (c) => (
        <g>
            <path fill={c} d="M80 40h80l25 70H55z" />
            <rect x="115" y="110" width="10" height="60" fill="#888" />
            <ellipse cx="120" cy="178" rx="40" ry="10" fill="#666" />
        </g>
    ),
    mug: (c) => (
        <g>
            <path d="M165 90c35 0 35 60 0 60" fill="none" stroke={c} strokeWidth="12" />
            <rect x="65" y="65" width="105" height="120" rx="12" fill={c} />
        </g>
    )
}

export default function ProductArt({ type, color, bg = '#f5f5f6' }) {
    const draw = SHAPES[type] || SHAPES.tshirt
    return (
        <svg viewBox="0 0 240 220" className="product-art" role="img" aria-label={type}>
            <rect width="240" height="220" fill={bg} />
            {draw(color)}
        </svg>
    )
}
