import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../shared/services/employee.service';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'max-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.sass']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private fireStore: AngularFirestore, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.resetForm();
    // this.toastr.success('Hello world!', 'Toastr fun!');
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      fullName: '',
      position: '',
      empCode: '',
      mobile: ''
    };
  }

  onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.fireStore.collection('employees').add(data);
    } else {
      this.fireStore.doc('employees/' + form.value.id).update(data);
    }

    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'EMP .Register');
  }


}
















