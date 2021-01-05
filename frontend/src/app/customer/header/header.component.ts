import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHomeComponent = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this. isHomeComponent = (this.router.url === '/') ? true : false;
    console.log(this.router.url);
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
          this. isHomeComponent = (this.router.url === '/') ? true : false;
        }
    });

  }

}
