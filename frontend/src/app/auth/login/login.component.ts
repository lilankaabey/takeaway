import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onNavigate() {
    if (this.router.url === '/admin/login') {
      this.router.navigate(['../signup'], {relativeTo: this.route});
    }
  }

  onLogin(form: NgForm) {
    const value = form.value;
    if (this.router.url === '/admin/login') {
      this.authService.loginUser(value.email, value.password, 'admin');
      form.reset();
    }
    if (this.router.url === '/system/login') {
      this.authService.loginUser(value.email, value.password, 'restaurant');
      form.reset();
    }
    if (this.router.url === '/login') {
      this.authService.loginUser(value.email, value.password, 'customer');
      form.reset();
    }
  }

}
