import { Component, OnInit } from '@angular/core';
import { Tasksdata } from '../datasource';
import { data } from '../datasource';
@Component({
  selector: 'app-performance-registration',
  templateUrl: './performance-registration.component.html',
  styleUrls: ['./performance-registration.component.css']
})
export class PerformanceRegistrationComponent implements OnInit {
  public dataSource?: Object[];
  public dataSource1?: Object[];
  public legendSettings1?: Object;
  public legendSettings?: Object;
  public dataLabel1?: Object;
  public dataLabel?: Object;
  public tilt1?: number;
  public tilt?: number;
  public chartTitle: string = 'Gender Distribution';
  public chartTitle1: string = 'Task Distribution';
  ngOnInit(): void {
    const tasks: Task[] = Tasksdata as Task[];

    // Aggregate tasks by assignedTo
    const taskCounts = tasks.reduce((acc, task) => {
      if (!acc[task.assignedTo]) {
        acc[task.assignedTo] = 0;
      }
      acc[task.assignedTo]++;
      return acc;
    }, {} as Record<string, number>);

    // Transform the aggregated data into the format needed for the chart
    this.dataSource = Object.keys(taskCounts).map(assignedTo => ({
      x: assignedTo,
      y: taskCounts[assignedTo],
      text: `${assignedTo}: ${taskCounts[assignedTo]}`
    }));

    this.legendSettings = { visible: false };
    this.dataLabel = {
      visible: true,
      name: 'text',
    };
    this.tilt = -45;
    const employees: Employee[] = data as Employee[];

    // Aggregate employees by gender
    const genderCounts = employees.reduce((acc: Record<string, number>, employee: Employee) => {
      if (!acc[employee.gender]) {
        acc[employee.gender] = 0;
      }
      acc[employee.gender]++;
      return acc;
    }, {} as Record<string, number>);

    // Transform the aggregated data into the format needed for the chart
    this.dataSource1 = Object.keys(genderCounts).map(gender => ({
      x: gender,
      y: genderCounts[gender],
      text: `${gender}: ${genderCounts[gender]}`
    }));

    this.legendSettings1 = { visible: false };
    this.dataLabel1 = {
      visible: true,
      name: 'text',
    };
    this.tilt1 = -45;
  
  }
}
interface Task {
  id: number;
  name: string;
  assignedTo: string;
  deadline: string;
}
interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  role: string;
  dob: Date;
  email: string;
  gender: string;
  department: string;
}