export class Product {
  public _id: string;
  public name: string;
  public category: string;
  public price: number;
  public description: string;
  public userId: string;
  public restaurantId: string;


  constructor(
    _id: string,
  name: string,
  category: string,
  price: number,
  description: string,
  userId: string,
  restaurantId: string,
  ) {
    this._id = _id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.description = description;
    this.userId = userId
    this.restaurantId = restaurantId;
  }
}
