import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-update-render-call',
  template: "<a class='btn btn-success' id='showdetails' (click)='btnClickedHandler()'>Update</a>",
  styleUrls: ['./update-render-call.component.css']
})
export class UpdateRenderCallComponent implements ICellRendererAngularComp {
  private params: any;
refresh:any;
  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.node.data.id);
  }
}
