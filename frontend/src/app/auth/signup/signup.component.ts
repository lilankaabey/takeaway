import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onNavigate() {
    if (this.router.url === '/admin/signup') {
      this.router.navigate(['../login'], {relativeTo: this.route});
    }
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (this.router.url === '/admin/signup') {
      this.authService.signupUser(value.email, value.password, 'admin')
        .subscribe(result => {
          form.reset();
          this.router.navigate(['../login'], {relativeTo: this.route});
        });

    }


  }

}
