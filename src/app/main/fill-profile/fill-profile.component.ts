import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {User} from '../shared/models/user.model';
import {AuthService} from '../shared/services/auth.service';
import {UserService} from '../shared/services/user.service';
import {ActivatedRoute, Params} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';
import {ImageService} from '../shared/services/image.service';
import * as moment from 'moment';

@Component({
  selector: 'max-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.sass']
})
export class FillProfileComponent implements OnInit {

  constructor(private authService: AuthService, private userServise: UserService, private route: ActivatedRoute, public dialog: MatDialog) {
  }

  confessions = ['religious', 'irreligious'];
  marritalStatuses = ['single', 'married', 'couple'];
  foodPreferences = ['kosher', 'vegeterian', 'non-vegetarian'];
  genders = ['female', 'male'];
  languages = ['Hebrew', 'English', 'French', 'Russian', 'Spain'];

  avatarURL;
  bannerUrl;

  srcAvatar = '../../../assets/icons/no_avatar(boy).png';
  srcBanner = '../../../assets/icons/banner.png';

  form: FormGroup;

  showError = false;

  isLoaded = false;

  proFileData = new User('', '', '', '', '', '', '', [''], [''], '', ['', '']);
  title = '';


  ngOnInit() {
    console.log(this.proFileData);
    const token = localStorage.getItem('token');
    this.userServise.getProfileData(token)
      .subscribe((user: User) => {
        this.proFileData = user;
        this.title = 'My profile';
        this.srcAvatar = user.pictureLink[0];
        console.log(user.pictureLink);
        this.srcBanner = user.pictureLink[1];
        this.isLoaded = true;
        console.log(user);
      }, (err) => {
        if (err.status === 401) {
          // TODO Unauthorized
        } else if (err.status === 409) {
          this.title = 'Registration';
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3500);
          this.isLoaded = true;
        }
      });
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['emptyProfile']) {
          this.title = 'Registration';
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3500);
        }
      });
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      confession: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      marritalStatus: new FormControl('', [Validators.required]),
      foodPreference: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      languages: new FormControl('', [Validators.required]),
      aboutMySelf: new FormControl('', [Validators.required])
    });
  }

  openDialog(avatarOrBanner: string): void {
    const dialogRef = this.dialog.open(UpdatePhotoComponent, {});

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (avatarOrBanner === 'avatar') {
            console.log('avatar', result);
            this.avatarURL = result;
          } else {
            console.log('banner', result);
            this.bannerUrl = result;
          }
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const user = JSON.parse(window.localStorage.getItem('user'));
    let pictureLink: any = [this.srcAvatar, this.srcBanner];
    if (user) {
      pictureLink = user.pictureLink;
    }
    pictureLink[0] = this.avatarURL ? this.avatarURL : pictureLink[0];
    pictureLink[1] = this.bannerUrl ? this.bannerUrl : pictureLink[1];
    console.log('pictureLink: ', pictureLink, 'avatarURL: ', this.avatarURL, 'bannerUrl', this.bannerUrl);

    const newUser = new User(form.value.firstName, form.value.lastName,
      form.value.phoneNumber, moment(form.value.birthDate).format('YYYY-MM-DD'),
      form.value.marritalStatus, form.value.gender, form.value.confession, form.value.languages,
      form.value.foodPreference, form.value.aboutMySelf, pictureLink);
    console.log(newUser);

    this.authService.fillFullProfile();
    this.userServise.updateUserProfile(newUser)
      .subscribe((u: User) => {
        window.localStorage.clear();
        window.localStorage.setItem('user', JSON.stringify(u));
        window.localStorage.setItem('token', 'Basic ' + btoa(u.email + ':' + u.password));
      }, (err) => {
        if (err.code === 401) {
          // TODO Unauthorized
        } else if (err.code === 422) {
          // TODO Invalid data
        }
      });
    // this.ngOnInit();
  }
}

@Component({
  selector: 'max-update-photo',
  templateUrl: 'max-update-photo.component.html',
  styleUrls: ['max-update-photo.component.sass']
})
export class UpdatePhotoComponent implements OnInit {
  @ViewChild('dialog') dialog: ElementRef;

  constructor(public dialogRef: MatDialogRef<UpdatePhotoComponent>, private imageService: ImageService) {
  }

  public files: UploadFile[] = [];
  image_url = '';

  ngOnInit() {
    this.dialog.nativeElement.parentElement.parentElement.style.border = '6px solid #5F4F8D';
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'bkahmhvk');

          this.imageService.postImage(formData)
            .subscribe((data) => {
              console.log(data['secure_url']);
              this.image_url = data['secure_url'];
            }, (err) => {
              console.log(err);
            });

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  onNoClick(): void {
    this.image_url = '';
    this.dialogRef.close();
  }

}

