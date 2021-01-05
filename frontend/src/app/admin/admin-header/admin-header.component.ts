import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;

  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authListenerSubs = this.authService.getAuthStatusListener().
        subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
    });
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
