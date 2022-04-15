export interface UpdateOfficeDto {
  id: string;
  name: string;
  lat?: number;
  lng?: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}
