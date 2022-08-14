import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityListService {

  constructor(private http :HttpClient) { }

  getEntityList() : Observable<any> {
    return this.http.get('assets/list.json');
  }

  getEntityDetail() : Observable<any> {
    return this.http.get('assets/detail.json');
  }
}
