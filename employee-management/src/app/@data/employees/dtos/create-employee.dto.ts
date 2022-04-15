export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  officeName?: string;
  birthDate?: Date;
  phoneNumber?: string;
  tags?: Array<string>;
}
