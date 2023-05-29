
export default function typed<T>(type: any): Awaited<T> {
    return type as Awaited<T>
}
