import {Component, Input} from '@angular/core';

export interface MyEvent {
  eventId: number;
  title: string;
  holiday: string;
  confession: string;
  date: string;
  time: string;
  duration: number;
  food: string[];
  description: string;
  status: string;
  participants: any[];
}

@Component({
  selector: 'max-my-event-pending',
  templateUrl: './my-event-pending.component.html',
  styleUrls: ['./my-event-pending.component.sass']
})
export class MyEventPendingComponent {
  @Input() eventPending: MyEvent;

  activeProfile: any;
  invitedAreShown = false;
  photoIsShown = true;
  buttonShowInvitedText = 'Show invited people';

  showPhoto(event, subscriber) {
    console.log(event.target);
    this.activeProfile = subscriber;
    console.log(this.activeProfile);
    this.photoIsShown = true;
  }

  toggleShowingSubscribers() {
    this.buttonShowInvitedText = this.invitedAreShown ? 'Show invited people' : 'Hide invited people';
    this.invitedAreShown = !this.invitedAreShown;
  }

  cancelShowingPhoto() {
    this.photoIsShown = false;
  }

}
