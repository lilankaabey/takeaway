export class User {
  public id?: string;
  public email: string;
  public password: string;
  public userType: string;

  constructor( id: string, email: string, password: string, userType: string) {
    this.email = email;
    this.password = password;
    this.userType = userType;
  }
}
