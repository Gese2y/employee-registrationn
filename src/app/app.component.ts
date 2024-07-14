import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { data } from './datasource';
import { FilterBarMode, FilterSettingsModel, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public data?: object[];
  public filterSettings: FilterSettingsModel = { mode: 'Immediate' as FilterBarMode }; // Set default mode if needed
  @ViewChild('template') template: DialogComponent | any;
    // Create element reference for dialog target element.
    @ViewChild('container', { read: ElementRef }) container: ElementRef | any;
    // The Dialog shows within the target element.
    public targetElement?: HTMLElement;
    public proxy: any = this;
  public pageSettings: PageSettingsModel = { pageSize: 5 };
  public filterModesData: string[] = ['Immediate', 'OnEnter'];
  @ViewChild('sidebar')
  public sidebar?: SidebarComponent;
  public width: string = '290px';

  ngOnInit(): void { 
      this.data = data;
  }
  public onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
}
openClick(): void {
    this.sidebar?.toggle();
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
  };
