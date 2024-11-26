import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  Islogged!: Boolean;
  showMenu = false;
  IsAdminlogged!: Boolean;
  constructor(public userserv:UserService,private route:Router,private adminserv:AdminService){
  userserv.getstate().subscribe((res)=>{
    this.Islogged=res
  })

  adminserv.getstate().subscribe((res)=>{
    console.log("admin:"+res);
    
    this.IsAdminlogged=res;
  })

  }
  logout(){
    this.userserv.removeUserFromLocalStorage("user")
    this.Islogged=this.userserv.getUserFromLocalStorage("user");
    window.location.reload();
    this.route.navigateByUrl('/home')
    
  }
  adminlogout(){
    this.adminserv.removeUserFromLocalStorage('admin')
    this.IsAdminlogged=this.adminserv.getUserFromLocalStorage('admin')
    this.route.navigateByUrl('/home')
  }
  
  
  


}