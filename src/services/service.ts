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
  async create(): Promise<void> {
    return;
  }
  async edit(): Promise<void> {
    return;
  }
  async delete(): Promise<void> {
    return;
  }
  async fetch(): Promise<void> {
    return;
  }
}

export default GenericService;
