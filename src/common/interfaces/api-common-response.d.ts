export interface APICommonResponse<T> {
    status: number
    data: T | null
    error: string | null
}
