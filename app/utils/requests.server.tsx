import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const cartCookie = createCookie("agora-cart-id", {
    maxAge: 604_800 * 4, // four weeks
    sameSite: "strict",
    secure: true,
    path: "*"
});

export function getStoreId(request: Request) {
    return request.headers.get("X-Agora-Store-Id") ?? 'AAABhUtFyNCsaqQL'
}
