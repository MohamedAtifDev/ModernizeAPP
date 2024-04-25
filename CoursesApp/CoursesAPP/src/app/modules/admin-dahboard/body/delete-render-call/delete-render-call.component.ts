import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-delete-render-call',
  template: "<a class='btn btn-danger' id='showdetails' (click)='btnClickedHandler()'>Delete</a>",
  styleUrls: ['./delete-render-call.component.css']
})
export class DeleteRenderCallComponent implements ICellRendererAngularComp {
  private params: any;
refresh:any;
  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.node.data.id);
  }

}
