export function getStoreId(request: Request) {
    return request.headers.get("X-Agora-Store-Id") ?? 'AAABhUtFyNCsaqQL'
}

export function getCartId(request: Request) {
    const cookies = request.headers.get("Cookie")
    if (!cookies) return null
    for (let cookie of cookies.split(';')) {
        const [key, val] = cookie.split('=')
        if (key.trim() === 'cart') return val
    }
    return null
}
