export interface IEmployeeAPI {
  _id: string;
  birthDate: Date;
  firstName: string;
  lastName: string;
  officeName: string;
  phoneNumber: string;
  tags: Array<string>;
}
