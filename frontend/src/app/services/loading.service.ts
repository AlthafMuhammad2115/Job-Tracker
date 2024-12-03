import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  public loadingSubject=new BehaviorSubject<boolean>(false)
  loading=this.loadingSubject.asObservable();

  showloading(){
    this.loadingSubject.next(true);
  }
  hideloading(){
    this.loadingSubject.next(false);
  }
}
