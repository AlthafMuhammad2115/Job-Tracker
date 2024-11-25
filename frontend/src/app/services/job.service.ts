import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LIST_JOB } from '../URLS/url';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient) { }

  list_all_jobs(){
    return this.http.get(LIST_JOB);
  }
}
