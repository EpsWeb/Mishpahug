import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {User} from '../shared/models/user.model';
import {Message} from '../shared/models/message.model';
import {Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'max-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {

  // email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', [Validators.required, Validators.min(6)]);
  //
  // getErrorEmailMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //     this.email.hasError('email') ? 'Not a valid email' :
  //       '';
  // }
  //
  // getErrorPasswordMessage() {
  //   return this.password.hasError('required') ? 'You must enter a value' :
  //     this.password.hasError('email') ? 'Not a valid email' :
  //       '';
  // }

  // user: User = new User('', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0);
  // registerForm: FormGroup;
  //
  // passConfirmed = '';
  //
  // constructor(private formBuilder: FormBuilder) {
  // }
  //
  // ngOnInit() {
  //   this.registerForm = this.formBuilder.group({
  //     'email': [this.user.email, [
  //       Validators.required,
  //       Validators.email
  //     ]],
  //     'password': [this.user.password, [
  //       Validators.required,
  //       Validators.minLength(6),
  //       Validators.maxLength(30)
  //     ]],
  //     'passwordConfirmed': [this.passConfirmed, [
  //       Validators.required,
  //       Validators.minLength(6),
  //       Validators.maxLength(30)
  //     ]]
  //   });
  // }
  //
  // onRegisterSubmit() {
  //   alert(this.user.email + ' ' + this.user.password + ' ' + this.passConfirmed);
  // }

  @Output() cancel = new EventEmitter<any>();
  @Output() loginFromRegistration = new EventEmitter<any>();

  constructor(private router: Router, private userService: UserService) {
  }

  form: FormGroup;
  message: Message;

  ngOnInit() {
    this.message = new Message('', 'danger');
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cofirmedPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  showMessage(text, type = 'danger') {
    this.message.text = text;
    this.message.type = type;
    setTimeout(() => {
      this.message.text = '';
    }, 2500);
  }

  cancelRegistration() {
    this.cancel.emit();
  }

  goToLogin() {
    this.loginFromRegistration.emit();
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const {email, password, cofirmedPassword} = form.value;
    if (password !== cofirmedPassword) {
      this.showMessage('Passwords are not same');
      return;
    } else {
      const user = new User(email, password, '', '', '', '', '', '', '', [], [], '', [], '', 0, 0);
      this.userService.getUserByEmail(email)
        .subscribe((userFromBase: User) => {
          if (userFromBase) {
            this.showMessage('This password is employed');
          } else {
            this.userService.registrateNewUser(user)
              .subscribe((newUser: User) => {
                this.router.navigate(['fill-profile']);
                this.cancelRegistration();
              });
          }
        });
    }
    console.log(form.value);

  }

}





















