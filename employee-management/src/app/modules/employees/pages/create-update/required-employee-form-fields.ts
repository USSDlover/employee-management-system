type TEmployeeFields = 'firstName' | 'lastName' | 'officeName' | 'birthDate' |
  'phoneNumber' | 'tags' | 'id';

type TEmployeeFieldType = 'number' | 'text' | 'date' | 'select';

export type TNewEmployeeFields = { label: string; id: TEmployeeFields; type: TEmployeeFieldType }[];

const RequiredFormFields: TNewEmployeeFields = [
  {
    label: 'First Name',
    id: 'firstName',
    type: 'text'
  },
  {
    label: 'Last Name',
    id: 'lastName',
    type: 'text'
  },
  {
    label: 'Office Name',
    id: 'officeName',
    type: 'select'
  },
  {
    label: 'Birth Date',
    id: 'birthDate',
    type: 'date'
  },
  {
    label: 'Phone Number',
    id: 'phoneNumber',
    type: 'number'
  },
  {
    label: 'Tags',
    id: 'tags',
    type: 'text'
  }
]

export const getNewEmployeeFields = (): TNewEmployeeFields => {
  return RequiredFormFields;
}
