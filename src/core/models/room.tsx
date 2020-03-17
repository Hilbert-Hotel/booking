export interface Room {
  id: number;
  type: string;
  description: string;
  available: number;
  price: number;
  photo?: string;
  facilities: string[];
}
