import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MishEvent} from '../../shared/models/event.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'max-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.sass']
})
export class EventCardComponent {

  @Input('event') event: MishEvent;

  constructor(public dialog: MatDialog) {
  }

  openDetail() {
    const dialogDetailRef = this.dialog.open(DialogDetailComponent, {
      data: {event: this.event}
    });

    dialogDetailRef.afterClosed().subscribe(result => {
      if (result) {
      }
      // TODO subscribe to this event
        console.log(result);
      });
  }
}


@Component({
  selector: 'max-dialog-detail',
  templateUrl: 'dialog-detail.component.html',
  styleUrls: ['dialog-detail.component.sass']
})
export class DialogDetailComponent implements OnInit{
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor(
    public dialogDetailRef: MatDialogRef<DialogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MishEvent) {}

  ngOnInit() {
    this.wrapper.nativeElement.parentElement.parentElement.style.border = '6px solid #5F4F8D';
    this.wrapper.nativeElement.parentElement.parentElement.style.padding = '0';
  }

  onNoClick(): void {
    this.dialogDetailRef.close();
  }

}

























