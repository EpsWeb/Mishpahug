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
export class TestComponent  {


  formRating;

}





















