export type Query<T, K extends keyof T> = { key: K; value: T[K] };

export default Query;
