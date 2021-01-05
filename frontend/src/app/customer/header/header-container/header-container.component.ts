import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss']
})
export class HeaderContainerComponent implements OnInit {

  isSearchMode = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

}
