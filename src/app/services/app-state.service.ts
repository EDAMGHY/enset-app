import { Injectable } from '@angular/core';
import { IAuthState, IProductState } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  public productState: IProductState = {
    isLoading: false,
    isError: false,
    keyword: '',
    errorMessage: '',
    page: 1,
    limit: 5,
    total: 0,
    pages: [],
    products: [],
  };

  public authState: IAuthState = {
    isAuthenticated: false,
    username: '',
    roles: [],
    token: '',
    isError: false,
    isLoading: false,
    errorMessage: '',
    openaiKey: 'YOUR API KEY',
  };

  constructor() {}

  public setProductState(state: IProductState) {
    this.productState = { ...this.productState, ...state };
  }

  public setAuthState(state: any) {
    this.authState = { errorMessage: '', ...this.authState, ...state };
  }
}
