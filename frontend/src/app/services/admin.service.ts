import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADMIN_JOB_LIST, ADMIN_LOGIN, ADMIN_SIGNUP } from '../URLS/url';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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

  setAdminToLocalStorage(key:any,res:any){
    localStorage.setItem(key,JSON.stringify(res))
  }

  getAdminFromLocalStorage(key:any){
    const user=localStorage.getItem(key)
    if(user){
      
      this.IsAdminLogged.next(true)
      console.log(this.IsAdminLogged);
      
      return JSON.parse(user)
    }
  }

  removeAdminFromLocalStorage(key:any){
    localStorage.removeItem(key)
    this.IsAdminLogged.next(false);
  }


  // get observable state

  getstate(){
    return this.IsAdminLogged.asObservable()
  }

   // is user logged

   IsAdminLoggedIn() {
    const userDetials = this.getAdminFromLocalStorage('admin');
    if (userDetials) {
      const userToken = userDetials.token;

      if (userToken) {
        const decodedToken: any = jwtDecode(userToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp > currentTime) {
          this.IsAdminLogged.next(true);
        }
      }else{
        this.IsAdminLogged.next(false);
      } 

    }else{
      this.IsAdminLogged.next(false);
    } 

    return this.IsAdminLogged.asObservable();

  }

  // logout if token expires
  logoutOnExpiry(): void {
    const userDetials = this.getAdminFromLocalStorage('admin')
    if (userDetials) {
      const token=userDetials.token
      if(token){
        const decodedToken: any = jwtDecode(token);
        const expiryTime = decodedToken.exp * 1000 - Date.now();
        setTimeout(() => this.removeAdminFromLocalStorage('admin'), expiryTime);
      }
      
    }
  }
}
