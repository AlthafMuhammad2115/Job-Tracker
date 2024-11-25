import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_APPLICATION, USER_LOGIN, USER_SIGNUP } from '../URLS/url';
import { BehaviorSubject } from 'rxjs';

function _window() : any {
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  get nativeWindow() : any {
    return _window();
  }
  usertoken: any;

  constructor(private http:HttpClient) { }

  userlogin(loginForm:any){
    return this.http.post(USER_LOGIN,loginForm)
  }

  usersignup(signupForm:any){
    return this.http.post(USER_SIGNUP,signupForm)
  }

  viewuserapplication(userid:string){
    return this.http.get(`${USER_APPLICATION}/${userid}`)
  }

  public IsLogged=new BehaviorSubject<Boolean>(false)

  setUserToLocalStorage(key:any,res:any){
    localStorage.setItem(key,JSON.stringify(res))
  }

  getUserFromLocalStorage(key:any){
    const user=localStorage.getItem(key)
    if(user){
      
      this.IsLogged.next(true)
      console.log(this.IsLogged);
      
      return JSON.parse(user)
    }
  }

  removeUserFromLocalStorage(key:any){
    localStorage.removeItem(key)
    this.IsLogged.next(false);
  }

  getstate(){
    return this.IsLogged.asObservable()
  }
}
