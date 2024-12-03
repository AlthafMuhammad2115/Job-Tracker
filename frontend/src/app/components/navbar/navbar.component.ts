import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {


  Islogged!: Boolean;
  showMenu = false;
  IsAdminlogged!: Boolean;
  open: boolean=false;
  constructor(
    public userserv: UserService,
    private route: Router,
    private adminserv: AdminService,
    private toast:ToastrService
  ) {

    userserv.getstate().subscribe((res) => {
      console.log("navbar",res);
      this.Islogged = res;
    });

    adminserv.getstate().subscribe((res) => {
      console.log('admin:' + res);

      this.IsAdminlogged = res;
    });
  }
  logout() {
    this.userserv.removeUserFromLocalStorage('user');
    this.Islogged = this.userserv.getUserFromLocalStorage('user');
    this.route.navigateByUrl('/home');
    window.location.reload();
    this.toast.success("User",'Logout')

  }
  adminlogout() {
    this.adminserv.removeAdminFromLocalStorage('admin');
    this.IsAdminlogged = this.adminserv.getAdminFromLocalStorage('admin');
    this.route.navigateByUrl('/home');
  }

  openSidebar() {
    this.open = true;
  }
  close() {
    this.open=false
    }
}
