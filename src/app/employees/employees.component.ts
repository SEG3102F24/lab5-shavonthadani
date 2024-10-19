import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Observable, of } from 'rxjs';
import { Employee } from '../model/employee';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  standalone: true,
  imports: [RouterLink, NgFor, AsyncPipe, DatePipe]
})
export class EmployeesComponent implements OnInit {
  employees$: Observable<Employee[]> = of([]);

  private employeeService: EmployeeService = inject(EmployeeService);

  ngOnInit(): void {
    // Fetch employees from the service
    this.employees$ = this.employeeService.getEmployees();
  }
}
