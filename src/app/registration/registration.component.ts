import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  implements OnInit {
  employeeForm: FormGroup|any;
  @Input() data: any;
  @Input() isEdit: any;
  @Output() completed = new EventEmitter<Employee>();
  @Output() completedupdate = new EventEmitter<Employee>();
  genders: Object[] = [
    { text: 'Male', value: 'Male' },
    { text: 'Female', value: 'Female' }
  ];

  departments: Object[] = [
    { text: 'IT', value: 'IT' },
    { text: 'Finance', value: 'Finance' },
    { text: 'HR', value: 'HR' }
  ];

  roles: Object[] = [
    { text: 'Manager', value: 'Manager' },
    { text: 'Developer', value: 'Developer' },
    { text: 'Designer', value: 'Designer' }
  ];
  isEdits: boolean=false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      department: ['', Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('changes',changes['isEdit'].currentValue);
    this.isEdits=changes['isEdit'].currentValue
    if (changes['data'] && changes['data'].currentValue) {
        const newData = changes['data'].currentValue as Employee; // Assuming Employee is your data model type
        this.employeeForm.patchValue(newData);
    }
}
update(){
  const newEmployee: Employee = this.employeeForm.value;
  this.completedupdate.emit(newEmployee);
  // this.employeeForm.reset();
}
  onSubmit(): void {
    console.log('this.employeeForm.value',this.employeeForm.value);
    this.employeeForm.patchValue({
      id:generateGuid()
    })
   
      const newEmployee: Employee = this.employeeForm.value;
      this.completed.emit(newEmployee);
      this.employeeForm.reset();
    
  }

}
export interface Employee {
  id: any;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  address: string;
  phone: string;
  email: string;
  role: string;
  department: string;
}
function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
  }