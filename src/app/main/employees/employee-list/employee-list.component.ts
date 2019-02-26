import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../shared/services/employee.service';
import {Employee} from '../../shared/models/employee.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'max-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.sass']
})
export class EmployeeListComponent implements OnInit {
  list: Employee[];

  constructor(private service: EmployeeService, private firestore: AngularFirestore, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.service.getEmployees()
      .subscribe((res) => {
        this.list = res.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Employee;
        });
      });
  }

  onEdit(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.firestore.doc('employees/' + id).delete();
      this.toastr.warning('Deleted successfully', 'EMP. Register');
    }
  }

}








































