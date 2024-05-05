import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'enset-app';
  currentPath = '/home';

  menus: {
    title: string;
    path: string;
    icon: string;
  }[] = [];

  setActiveMenu(path: string) {
    this.currentPath = path;
  }

  constructor(private router: Router) {}
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
