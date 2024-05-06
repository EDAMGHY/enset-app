import { Component } from '@angular/core';
import { IMenu } from '../types';
import { LoadingService } from '../services/loading.service';
import { AppStateService } from '../services/app-state.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private ld: LoadingService,
    public appState: AppStateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.menus = [
      {
        title: 'Home',
        path: '/home',
        icon: 'house',
      },
      {
        title: 'Products',
        path: '/admin/products',
        icon: 'arrow-down-up',
      },
      {
        title: 'New Product',
        path: '/admin/new-product',
        icon: 'plus-circle',
      },
    ];
    this.currentPath = window.location.pathname;
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  handleLogin() {
    this.router.navigateByUrl('/login');
  }
}
