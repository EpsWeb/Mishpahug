import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Message} from '../../models/message.model';
import {User} from '../../models/user.model';

@Component({
  selector: 'max-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

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
    const {email, password, cofirmedPassword} = form.value;
    if (password !== cofirmedPassword) {
      this.showMessage('Passwords are not same');
      return;
    } else {
      this.userService.registrateNewUser(email, password)
        .subscribe((res) => {
          this.cancel.emit();
          // Hide createAccount and login, appear burger
          this.router.navigate(['main/fill-profile']);
        }, (err) => {
          if (err.status === 409) {
            this.showMessage('User exists!');
          } else if (err.status === 422) {
            this.showMessage('Invalid data!');
          }
        });
    }

  }

}
