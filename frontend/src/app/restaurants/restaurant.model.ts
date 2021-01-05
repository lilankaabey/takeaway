import { User } from '../auth/user.model';

export class Restaurant {
  public _id: string;
  public ownerName: string;
  public restaurantName: string;
  public email: string;
  public imagePath: string;
  public town: string;
  public street: string;
  public houseNumber: string;
  public contactNumber: string;
  public deliveryTime: string;
  public deliveryStatus: string;
  public minAmount: number;
  public description: string;
  public createrId?: string;
  public userId?: string;
  public products?: string[];
  public orders?: string[];

  constructor(
    _id: string,
    ownerName: string,
    restaurantName: string,
    email: string,
    imagePath: string,
    town: string,
    street: string,
    houseNumber: string,
    contactNumber: string,
    deliveryTime: string,
    deliveryStatus: string,
    minAmount: number,
    description: string,
    createrId?: string,
    userId?: string,
    products?: string[],
    orders?: string[],
  ) {
    this._id = _id;
    this.ownerName = ownerName;
    this.restaurantName = restaurantName;
    this.email = email;
    this.imagePath = imagePath;
    this.town = town;
    this.street = street;
    this.houseNumber = houseNumber;
    this.contactNumber = contactNumber;
    this.deliveryTime = deliveryTime;
    this.deliveryStatus = deliveryStatus;
    this.minAmount = minAmount;
    this.description = description;
    this.createrId = createrId;
    this.userId = userId;
    this.products = products;
    this.orders = orders;
  }
}
