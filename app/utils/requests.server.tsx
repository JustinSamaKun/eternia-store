import * as process from "process";

export function getStoreId(request: Request) {
    const id = request.headers.get("X-Agora-Store-Id") ?? process.env.STORE_ID
    if (!id) throw new Error("No store id in request!")
    return id
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
