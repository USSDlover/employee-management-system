export interface UpdateEmployeeDto {
  id: string;
  firstName: string;
  lastName: string;
  officeName?: string;
  birthDate?: Date;
  phoneNumber?: string;
  tags?: Array<string>;
}
