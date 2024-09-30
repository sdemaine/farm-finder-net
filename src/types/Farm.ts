export interface Farm {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    miles: number;
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
    website?: string;
  }