import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  isAuthMode = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isAuthMode = (
          event.url === '/admin/signup' ||
          event.url === '/admin/login' ||
          event.url === '/system/signup' ||
          event.url === '/system/login') ? true : false;
        }
    });
    this.isAuthMode = (
      this.router.url === '/admin/signup' ||
      this.router.url === '/admin/login' ||
      this.router.url === '/system/signup' ||
      this.router.url === '/system/login') ? true : false;

  }



}
