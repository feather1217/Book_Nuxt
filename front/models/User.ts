
export default class User {
  _id: number;
  name: string;
  account: string;
  password: string;
  birthday: Date;
  gender: number; // 0: 未設定, 1: 男性, 2: 中性, 3: 女性
  email: string;
  
  constructor( 
    _id: number,
    name: string,
    account: string,
    password: string,
    birthday: Date,
    gender: number,
    email: string,
  ) {
    this._id = _id;
    this.name = name;
    this.account = account;
    this.password = password;
    this.birthday = birthday;
    this.gender = gender;
    this.email = email;
  }
}

