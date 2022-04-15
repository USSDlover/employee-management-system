type TEmployeeColumns = 'name' | 'officeName' | 'birthDate' | 'phoneNumber' | 'tags';

type TEmployeeColHeaders = 'Name' | 'Office Name' | 'Birth Date' | 'Phone Number' | 'Tags';

type EmployeesTable = {
  header: TEmployeeColHeaders;
  col: TEmployeeColumns;
}[];

export const EmployeeTableColumns: EmployeesTable = [
  { header: 'Name', col: 'name' },
  { header: 'Office Name', col: 'officeName' },
  { header: 'Phone Number', col: 'phoneNumber' },
  { header: 'Birth Date', col: 'birthDate' },
  { header: 'Tags', col: 'tags' }
]
