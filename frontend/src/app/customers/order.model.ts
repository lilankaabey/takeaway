import { Product } from "../products/product.model";

export class Order {
  constructor(
    public _id: string,
    public products: { product: Product, quantity: number, productsCost: number}[],
    public totalCost: number,
    public customer: {},
    public restaurantId?: string
  ) {}
}
