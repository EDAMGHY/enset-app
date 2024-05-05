import { Injectable } from '@angular/core';
import { IProductState } from '../types';

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

  constructor() {}

  public setProductState(state: IProductState) {
    this.productState = { ...this.productState, ...state };
  }
}
