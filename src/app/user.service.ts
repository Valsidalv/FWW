import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlGetUser: string = 'https://fww-demo.herokuapp.com/';
  
  constructor(public http: HttpClient) { }

  getAll() {
    let queryParams = {
      params: new HttpParams().set("pageSize", "1").set("page", '1')
    }
    return this.http.get<any>(this.urlGetUser, queryParams);
  }
}
