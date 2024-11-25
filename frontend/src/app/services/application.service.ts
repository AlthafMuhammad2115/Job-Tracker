import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_APPLICANT } from '../URLS/url';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http:HttpClient) { }

  add_applicant(applicant_detials:any,job_id:string,company_id:string){
    return this.http.post(`${ADD_APPLICANT}/${company_id}/${job_id}`,applicant_detials)
  }
}
