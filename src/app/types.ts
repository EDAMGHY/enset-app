export interface IProduct {
  id: number;
  name: string;
  price: number;
  checked: boolean;
}
export interface IPaginatedProducts {
  pages: number;
  items: number;
  data: IProduct[];
}
