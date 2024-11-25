import { Component, HostListener } from '@angular/core';
import { UserService } from './services/user.service';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  constructor(private userserv:UserService, private adminserv:AdminService){
    this.userserv.getUserFromLocalStorage('user')
    this.adminserv.getUserFromLocalStorage('admin')
  }

  ngOnInit(){
    this.userserv.getUserFromLocalStorage('user')


  }
  @HostListener('window:load')
  onLoad() {
    this.userserv.getUserFromLocalStorage('user')
    this.adminserv.getUserFromLocalStorage('admin')

  }
}
