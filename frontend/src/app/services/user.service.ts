import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_APPLICATION, USER_LOGIN, USER_SIGNUP } from '../URLS/url';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

function _window(): any {
  return window;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  get nativeWindow(): any {
    return _window();
  }

  public IsLogged = false;
  public IsLoggedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}


  userlogin(loginForm: any) {
    return this.http.post(USER_LOGIN, loginForm);
  }

  usersignup(signupForm: any) {
    return this.http.post(USER_SIGNUP, signupForm);
  }

  viewuserapplication(userid: string) {
    return this.http.get(`${USER_APPLICATION}/${userid}`);
  }



  setUserToLocalStorage(key: any, res: any) {
    localStorage.setItem(key, JSON.stringify(res));
  }

  getUserFromLocalStorage(key: any) {
    const user = localStorage.getItem(key);
    if (user) {
      return JSON.parse(user);
    }
  }

  removeUserFromLocalStorage(key: any) {
    localStorage.removeItem(key);
  }

  // is user logged

  IsLoggedIn() {
    const userDetials = this.getUserFromLocalStorage('user');
    if (userDetials) {
      const userToken = userDetials.token;

      if (userToken) {
        const decodedToken: any = jwtDecode(userToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp > currentTime) {
          this.IsLoggedSubject.next(true);
          this.IsLogged=true;
          return this.IsLogged;
        }
      }else{
        this.IsLoggedSubject.next(false);
        this.IsLogged=false;
      } 

    }else{
      this.IsLoggedSubject.next(false);
      this.IsLogged=false
    } 
    return this.IsLogged
    
  }

  // get observable state
  getstate(){
    return this.IsLoggedSubject.asObservable()
  }

  // logout if token expires
  logoutOnExpiry(): void {
    const userDetials = this.getUserFromLocalStorage('user')
    if (userDetials) {
      const token=userDetials.token
      if(token){
        const decodedToken: any = jwtDecode(token);
        const expiryTime = decodedToken.exp * 1000 - Date.now();
        setTimeout(() => this.removeUserFromLocalStorage('user'), expiryTime);
      }
      
    }
  }
}
