export class QueryClass<T, K extends keyof T> {
  key: K;
  value: T[K];
  constructor({ key, value } = {} as Query<T, K>) {
    this.key = key;
    this.value = value;
  }
  transform(): Record<key, unknown> {
    return { [this.key]: this.value };
  }
}

type key = string | number | symbol;
/**
 * @typedef {Object} Query
 * @property {string} key
 * @property {any} value
 */
export type Query<T, K extends keyof T> = { key: K; value: T[K] };
export default Query;
