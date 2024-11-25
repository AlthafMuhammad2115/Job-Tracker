import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADMIN_JOB_LIST, ADMIN_LOGIN, ADMIN_SIGNUP } from '../URLS/url';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }


  adminlogin(loginForm:any){
    return this.http.post(ADMIN_LOGIN,loginForm)
  }

  adminsignup(signupForm:any){
    return this.http.post(ADMIN_SIGNUP,signupForm)
  }

  adminlistjobs(company_id:string){
    return this.http.get(`${ADMIN_JOB_LIST}/${company_id}`);
  }


  public IsAdminLogged=new BehaviorSubject<Boolean>(false);

  setUserToLocalStorage(key:any,res:any){
    localStorage.setItem(key,JSON.stringify(res))
  }

  getUserFromLocalStorage(key:any){
    const user=localStorage.getItem(key)
    if(user){
      
      this.IsAdminLogged.next(true)
      console.log(this.IsAdminLogged);
      
      return JSON.parse(user)
    }
  }

  removeUserFromLocalStorage(key:any){
    localStorage.removeItem(key)
    this.IsAdminLogged.next(false);
  }

  getstate(){
    return this.IsAdminLogged.asObservable()
  }
}
