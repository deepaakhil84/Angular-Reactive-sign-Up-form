import { Component, OnInit } from '@angular/core';
//  1. import Building blocks
import { FormGroup, FormControl } from '@angular/forms'

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  //2. specify a property for a root form group
  customerForm: FormGroup;
  //3.data Model
  customer = new Customer();

  constructor() { }

  ngOnInit() {
    //4.create and intialize the form group property and add FormControl to each property
    //5.Reactive Form Module into the app module 6.Update the template

    this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true)

    });

  }
  //function for intialize value in the form

  populatedTestData(): void {
    this.customerForm.setValue({
      firstName: 'jack',
      lastName: 'Harkness',
      email: 'jack@gmail.com',
      sendCatalog: false
    })
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
}
