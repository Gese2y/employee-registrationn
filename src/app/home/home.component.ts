import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent, TreeViewComponent ,NodeSelectEventArgs} from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  navigateTo: any='Employees';
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @ViewChild('sidebarTreeviewInstance')
  public sidebarTreeviewInstance?: SidebarComponent;
  @ViewChild('treeviewInstance')
  public treeviewInstance?: TreeViewComponent;
  public width: string = '290px';
  public enableDock: boolean = true;
  public dockSize:string ="44px";
  public mediaQuery: string = ('(min-width: 600px)');
  public target: string = '.main-content';

  public data: Object[] = [
      {
          nodeId: '01', nodeText: 'Employees', iconCss: 'icon-microchip icon',
      },
      {
          nodeId: '02', nodeText: 'Departements', iconCss: 'icon-thumbs-up-alt icon',
      },
      {
          nodeId: '03', nodeText: 'Roles', iconCss: 'icon-docs icon',
      },
      
      {
          nodeId: '04', nodeText: 'Tasks', iconCss: 'icon-docs icon',
      },
      
      {
          nodeId: '05', nodeText: 'Persformance', iconCss: 'icon-docs icon',
      },
 
  ];
  public field:Object ={ dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss' };

  public onCreated(args: any) {
      (this.sidebarTreeviewInstance as SidebarComponent).element.style.visibility = '';
  }
  public onClose(args: any) {
      (this.treeviewInstance as TreeViewComponent).collapseAll();
  }
  select(event: NodeSelectEventArgs): void {
    const selectedNodeText = event.nodeData['text'];
    this.navigateTo=selectedNodeText
    console.log('Selected Node Text:', selectedNodeText);
  }
  openClick() {
      if((this.sidebarTreeviewInstance as SidebarComponent).isOpen)
      {
          (this.sidebarTreeviewInstance as SidebarComponent).hide();
          (this.treeviewInstance as TreeViewComponent).collapseAll();
      }
      else {
          (this.sidebarTreeviewInstance as SidebarComponent).show();
          (this.treeviewInstance as TreeViewComponent).expandAll();
      }  
  }

}
