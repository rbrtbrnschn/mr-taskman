/**
 * **Generic Service Class**.
 * Outlines formatting of other service classes.
 */
export class GenericService {
  label: string;
  constructor(label: string) {
    this.label = label;
    return;
  }
  async create(...params: unknown[]): Promise<unknown> {
    return;
  }
  async edit(...params: unknown[]): Promise<unknown> {
    return;
  }
  async delete(...params: unknown[]): Promise<unknown> {
    return;
  }
  async fetch(...params: unknown[]): Promise<unknown> {
    return;
  }
}

export default GenericService;
