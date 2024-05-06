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

export interface IProductState {
  isLoading?: boolean;
  isError?: boolean;
  keyword?: string;
  errorMessage?: string;
  page?: number;
  total?: number;
  limit?: number;
  pages?: number[];
  products?: IProduct[];
}
export interface IAuthState {
  isAuthenticated?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  username?: string;
  password?: string;
  token?: string;
  roles?: string[];
  [key: string]: any;
}

export interface IUser {
  id?: string;
  username?: string;
  password?: string;
  token?: string;
  roles?: string[];
}

export interface IMenu {
  title: string;
  path: string;
  icon: string;
}
