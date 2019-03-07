import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'max-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent {

  constructor(private router: Router) { }

  goToEvents() {
    this.router.navigate(['main/events']);
  }

}
