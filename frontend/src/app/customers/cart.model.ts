export class Cart {
  constructor(
    public _id: string,
    public items: { _id?: string, productId?: string, quantity?: number}[],
    public customerId?: string
  ) {}
}
