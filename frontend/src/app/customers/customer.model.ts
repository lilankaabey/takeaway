export class Customer {
  constructor(
    public _id: string,
    public address: string,
    public town: string,
    public customerName: string,
    public email: string,
    public contactNumber: string,
    public deliveryTime: string,
    public floor?: string,
    public companyName?: string,
    public remarks?: string,
    public userId?: string,
    public orders?: string[],
    public cartId?: string
  ) {}
}
