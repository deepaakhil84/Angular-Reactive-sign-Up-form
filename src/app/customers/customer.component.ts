import { Component, OnInit } from '@angular/core';
//  1. import Building blocks
import { FormGroup, FormControl, FormBuilder, Validator, Validators, AbstractControl } from '@angular/forms'
import { Customer } from './customer';

//custom validation function for rating

function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { 'range': true };
  }
  return null
}



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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      //built in validation
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      notification: 'email',
      //custom validation
      rating: [null, ratingRange],
      sendCatalog: true
    })
  }
  //4.create and intialize the form group property and add FormControl to each property
  //5.Reactive Form Module into the app module 6.Update the template
  //  rewrite the code using form builder inside ngOnInit
  //   this.customerForm = new FormGroup({
  //     firstName: new FormControl(),
  //     lastName: new FormControl(),
  //     email: new FormControl(),
  //     sendCatalog: new FormControl(true)

  //   });

  // }
  //function for intialize value in the form

  populatedTestData(): void {
    this.customerForm.patchValue({
      firstName: 'jack',
      lastName: 'Harkness',

      sendCatalog: false
    })
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
  //notification checker
  setNotification(notifyVia: string): void {
    //get the phones formControl name
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    }
    else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }


}




