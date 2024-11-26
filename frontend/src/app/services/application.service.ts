import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_APPLICANT, LIST_APPLICANT, UPDATE_APPLICANT_STATUS } from '../URLS/url';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http:HttpClient) { }

  add_applicant(applicant_detials:any,job_id:string,company_id:string){
    return this.http.post(`${ADD_APPLICANT}/${company_id}/${job_id}`,applicant_detials)
  }

  list_applicants(company_id:any,job_id:any){
    return this.http.get(`${LIST_APPLICANT}/${company_id}/${job_id}`,)
  }

  update_status(company_id:any,job_id:any,form:any){
    return this.http.patch(`${UPDATE_APPLICANT_STATUS}/${company_id}/${job_id}`,form)
  }
}
