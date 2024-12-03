import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CREATE_JOB, DELETE_JOB, FILTER_JOB, LIST_JOB } from '../URLS/url';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http:HttpClient) { }

  list_all_jobs(){
    return this.http.get(LIST_JOB);
  }

  create_job(jobForm:any){
    return this.http.post(CREATE_JOB,jobForm);
  }

  delete_job(job_id:any){
    return this.http.delete(`${DELETE_JOB}/${job_id}`);
  }

  filter_job(searchdata:any){
    return this.http.post(FILTER_JOB,searchdata);
  }
}
