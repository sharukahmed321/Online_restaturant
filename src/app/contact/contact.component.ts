import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback:Feedback;
  contactType=ContactType;
  @ViewChild('fform') feedbackFormDirective;

  formErrors={
    'firstname': '',
    'lastname' : '',
    'telnum': '',
    'email' : ''
  };


  validationMessages ={
    'firstname':{
      'required':'First name is required.',
      'minlength': 'First name must be at least two characters long.',
      'maxlength' : 'First name cannot be more than 25 characters long'
    },
    'lastname':{
      'required':'last name is required.',
      'minlength': 'last name must be at least two characters long.',
      'maxlength' : 'last name cannot be more than 25 characters long'
    },
    'telnum': {
      'required': 'tel.num is required',
      'pattern' : 'tel.num  must contain only numbers'
    },
    'email' : {
      'required' : 'Email is required',
      'email' : 'email not in valid format'
    }

  };

  constructor(private fb:FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges.subscribe(data =>this.onValueChanged(data));

    this.onValueChanged();
  }

    onValueChanged(data?: any){
      if(!this.feedbackForm){
        return;
      }
      const form =this.feedbackForm;
      for(const field in this.formErrors){
        if(this.formErrors.hasOwnProperty(field)) {
          //clear previous error messages (if any)
          this.formErrors[field]= '';
          const control =form.get(field);
          if( control && control.dirty && !control.valid){
            const messages =this.validationMessages[field];
            for(const key in control.errors){
              if(control.errors.hasOwnProperty(key)){
                this.formErrors[field] +=messages[key] + ' ';
              }
            }
          }
        }
      }
    }
  
  onSubmit(){
    this.feedback =this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum: 0,
      email:'',
      agree:false,
      contactType:'None',
      message:''
    });
    this.feedbackFormDirective.reserForm();
  }

}
