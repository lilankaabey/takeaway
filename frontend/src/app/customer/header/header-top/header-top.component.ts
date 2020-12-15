import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {
  @ViewChild('locationFormEl', {static: false}) locationSearchForm: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){}

}
