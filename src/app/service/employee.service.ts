import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private firestore: Firestore) { }

  addEmployee(employee: Employee): Promise<void> {
    const employeeRef = collection(this.firestore, 'employees');
    const { ...employeeData } = employee;
    return addDoc(employeeRef, employeeData).then(() => { });
  }

  getEmployees(): Observable<Employee[]> {
    const employeeRef = collection(this.firestore, 'employees');
    return collectionData(employeeRef, { idField: 'id' }).pipe(
      map((employees: any[]) => employees.map(emp => {
        if (emp.dateOfBirth && emp.dateOfBirth.toDate) {
          emp.dateOfBirth = emp.dateOfBirth.toDate();
        }
        return emp as Employee;
      }))
    );
  }
}
