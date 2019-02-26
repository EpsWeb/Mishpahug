import {Injectable} from '@angular/core';
import {Employee} from '../models/employee.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class EmployeeService {
  formData: Employee;

  constructor(private firestore: AngularFirestore) {
  }

  getEmployees() {
    return this.firestore.collection('employees').snapshotChanges();
  }
}
