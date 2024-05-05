import { Component } from '@angular/core';
import { IMenu } from '../types';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  currentPath = '/home';

  menus: IMenu[] = [];

  public loading = this.ld.isLoading$;

  setActiveMenu(path: string) {
    this.currentPath = path;
  }

  constructor(private ld: LoadingService) {}

  ngOnInit() {
    this.menus = [
      {
        title: 'Home',
        path: '/home',
        icon: 'house',
      },
      {
        title: 'Products',
        path: '/products',
        icon: 'arrow-down-up',
      },
      {
        title: 'New Product',
        path: '/new-product',
        icon: 'plus-circle',
      },
    ];
    this.currentPath = window.location.pathname;
  }
}
