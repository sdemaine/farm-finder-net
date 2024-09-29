export interface Farm {
  id: string;
  name: string;
  miles: number;
  city: string;
  state: string;
  products: string[];
  latitude: number;
  longitude: number;
  preferred: boolean;
  description?: string;
  foundedYear?: number;
  farmSize?: string;
  certifications?: string[];
  contactEmail?: string;
  phoneNumber?: string;
}