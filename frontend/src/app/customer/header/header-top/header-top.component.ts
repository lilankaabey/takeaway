import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {
  @ViewChild('locationFormEl', {static: false}) locationSearchForm: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onFindRestaurant(form: NgForm){
    const location = form.value.location;
    this.router.navigate(['search', location]);


  }

}
