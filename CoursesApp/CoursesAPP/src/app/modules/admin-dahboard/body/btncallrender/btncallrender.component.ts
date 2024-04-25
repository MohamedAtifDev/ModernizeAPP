import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-btncallrender',
  template: "<a class='btn btn-primary' id='showdetails' (click)='btnClickedHandler()'>Details</a>",
  styleUrls: ['./btncallrender.component.css']
})
export class BtncallrenderComponent implements ICellRendererAngularComp {
  private params: any;
refresh:any;
  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.node.data.id);
  }
  
}

