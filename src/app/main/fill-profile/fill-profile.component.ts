import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {User} from '../shared/models/user.model';
import {AuthService} from '../shared/services/auth.service';
import {UserService} from '../shared/services/user.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'max-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.sass']
})
export class FillProfileComponent implements OnInit {

  constructor(private authService: AuthService, private userServise: UserService, private route: ActivatedRoute) {
  }

  confessions = ['religious', 'irreligious'];
  marritalStatuses = ['single', 'married', 'couple'];
  foodPreferences = ['kosher', 'vegeterian', 'non-vegetarian'];
  genders = ['female', 'male'];
  languages = ['Hebrew', 'English', 'French', 'Russian', 'Spain'];

  form: FormGroup;

  showError = false;

  proFileData;
  title = '';

  ngOnInit() {
    this.proFileData = this.authService.getProfileData();
    console.log(this.proFileData);
    if (this.proFileData['firstName']) {
      this.title = 'My profile';
    } else {
      this.title = 'Registration';
    }
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['emptyProfile']) {
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3500);
        }
      });
    this.form = new FormGroup({
      firstName: new FormControl(this.proFileData['firstName'], [Validators.required]),
      lastName: new FormControl(this.proFileData['lastName'], [Validators.required]),
      phoneNumber: new FormControl(this.proFileData['phoneNumber'], [Validators.required]),
      confession: new FormControl(this.proFileData['confession'], [Validators.required]),
      birthDate: new FormControl(this.proFileData['dateOfBirth'], [Validators.required]),
      marritalStatus: new FormControl(this.proFileData['maritalStatus'], [Validators.required]),
      foodPreference: new FormControl(this.proFileData['foodPreferences'], [Validators.required]),
      gender: new FormControl(this.proFileData['gender'], [Validators.required]),
      languages: new FormControl(this.proFileData['language'], [Validators.required]),
      aboutMySelf: new FormControl(this.proFileData['description'], [Validators.required])
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const user = JSON.parse(window.localStorage.getItem('user'));
    const {email, password, pictureLink, banner, rate, numberOfVotes, id} = user;
    console.log(email, password, form.value);

    const newUser = new User(email, password, form.value.firstName, form.value.lastName, form.value.phoneNumber, form.value.birthDate,
      form.value.marritalStatus, form.value.gender, form.value.confession, form.value.languages,
      form.value.foodPreference, form.value.aboutMySelf,
      pictureLink, banner, rate, numberOfVotes, id);
    console.log(newUser);

    this.authService.fillFullProfile();
    this.userServise.fillProfile(newUser)
      .subscribe((u: User) => {
        window.localStorage.clear();
        window.localStorage.setItem('user', JSON.stringify(u));
      });


  }

}
