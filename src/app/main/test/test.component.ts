import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, NgForm} from '@angular/forms';

// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'max-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent {

  // animal: string;
  // name: string;

  // constructor(public dialog: MatDialog) {
  // }
  //
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     // width: '100%',
  //     // data: {name: this.name, animal: this.animal}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // this.animal = result;
  //   });
  // }

}

// @Component({
//   selector: 'max-dialog',
//   templateUrl: 'max-dialog.component.html',
//   styleUrls: ['max-dialog.component.sass']
// })
// export class DialogComponent implements OnInit {
//   @ViewChild('dialog') dialog: ElementRef;
//
//   constructor(
//     public dialogRef: MatDialogRef<DialogComponent>,
//     // @Inject(MAT_DIALOG_DATA) public data: DialogData
//   ) {
//   }
//
//   confessions = ['Irreligious', 'Religious'];
//   holidays = ['Shabat', 'Purim', 'Pesach', 'Rosh Hashana', 'Sukkot'];
//   foods = ['Kosher', 'Vegetarian', 'Any'];
//
//   form: FormGroup;
//
//   ngOnInit() {
//     this.dialog.nativeElement.parentElement.parentElement.style.border = '6px solid #5F4F8D';
//     this.form = new FormGroup({
//       dateFrom: new FormControl(''),
//       dateTo: new FormControl(''),
//       holiday: new FormControl(''),
//       confession: new FormControl(''),
//       food: new FormControl('')
//     });
//   }
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//
//   onSubmit(form: NgForm) {
//     console.log(form);
//   }
//
// }





















