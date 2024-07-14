import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Tasksdata } from '../datasource';
import { FilterBarMode, FilterSettingsModel, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
// import { Departements } from '../registration/registration.component'; 
@Component({
  selector: 'app-tasks-registration',
  templateUrl: './tasks-registration.component.html',
  styleUrls: ['./tasks-registration.component.css']
})
export class TasksRegistrationComponent implements OnInit {
  @ViewChild('dialogObj') dialogObj: DialogComponent | any;
  public data: Departements[] = [];
  public filterSettings: FilterSettingsModel = {
     mode: 'Immediate' as FilterBarMode }; // Set default mode if needed
  @ViewChild('template') template: DialogComponent | any;
    // Create element reference for dialog target element.
    @ViewChild('container', { read: ElementRef }) container: ElementRef | any;
    // The Dialog shows within the target element.
     public datas: any;
    public targetElement?: HTMLElement;
    public proxy: any = this;
  public pageSettings: PageSettingsModel = { pageSize: 5 };
  public filterModesData: string[] = ['Immediate', 'OnEnter'];
  @ViewChild('sidebar')
  activeContent = 'Employees';
  public sidebar?: SidebarComponent;
  public width: string = '290px';
  dialogContent: any;
  isEdit: boolean=false;

  ngOnInit(): void { 
    this.data = Tasksdata as Departements[];
  }
  public onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
}
dialogButtonClick(): void {
  this.dialogObj.hide(); // Close the dialog
}
openDialog(data: any,isEdit:boolean): void {
  // Customize dialog content if needed
  this.datas=data
  this.isEdit=isEdit
  this.dialogContent = `Order ID: ${data.OrderID}`;
  this.dialogObj.show();
}
openClick(): void {
  console.log('test',this.sidebar);
  
    this.sidebar?.toggle();
}

  updateEmployee(updatedEmployee: Departements): void {
    const index = this.data.findIndex(emp => emp.name === updatedEmployee.name);
    if (index !== -1) {
      this.data[index] = updatedEmployee;
      this.dialogObj.hide();
    }
  }
  deleteTask(email: any): void {

    this.data = this.data.filter(emp => emp.name !== email.email);
  }
register(employee: Departements): void {
  console.log('employee',employee);
  
  this.data.push(employee);
  this.data = [...this.data]; // Update the data source to refresh the grid
}

  onModeChange(args: ChangeEventArgs): void {
    if (typeof args.value === 'string' && (args.value === 'Immediate' || args.value === 'OnEnter')) {
      this.filterSettings = {
        mode: args.value as FilterBarMode,
      };
    } else {
      console.error('Invalid mode:', args.value);
    }
  }
  onMenuClick(menuItem: string): void {
    console.log('menuItem',menuItem);
    
    this.activeContent = menuItem;
  }
  };
  export interface Departements {
    name: any;
    head: string;
    location: string;
  }