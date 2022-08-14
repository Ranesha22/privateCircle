import { EntityListService } from './entity-list.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  entityList: any = [];
  details: any = [];
  entity: any;
  prev : any = {} ;
  displayedColumns: string[] = ['date', 'list', 'entities', 'actions', 'detail'];
  dataSource!: MatTableDataSource<Entity>
  start = new Date(2022, 0, 1);
  end = new Date();

  constructor(private entityService: EntityListService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    //get data for table from json file.
    this.entityService.getEntityList().subscribe(res => {
      this.entityList = res;
      this.entityList.forEach((element: any) => {
        //generate random dates.
        let x = this.datePipe.transform(new Date(this.start.getTime() + Math.random() * (this.end.getTime() - this.start.getTime())))?.split(',')[0];
        element.date = x;
        element.selected = false;
      });
      this.dataSource = new MatTableDataSource(this.entityList);
    })
  }

  //filter list
  doFilter(value: string) {
    console.log(this.dataSource);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  //fetch detail on an entity
  getDetail(value: string) {
    this.entity = value;
    this.entityService.getEntityDetail().subscribe(res => {
      this.details = res;
    })
  }

  activeRow(row:Entity){
    this.prev.selected = !this.prev.selected;
    row.selected = !row.selected;
    this.prev = row;
  }
}

export interface Entity {
  "SNo": number
  "date": string
  "desc": string,
  "entity": number,
  "active": boolean,
  "selected" : boolean
}
