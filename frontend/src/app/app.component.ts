import { Component, HostListener } from '@angular/core';
import { UserService } from './services/user.service';
import { AdminService } from './services/admin.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  Isloading: boolean = false;

  constructor(
    private userserv: UserService,
    private adminserv: AdminService,
    private loadingServ: LoadingService
  ) {
    this.adminserv.IsAdminLoggedIn();
    this.userserv.IsLoggedIn();
    loadingServ.loading.subscribe((res) => {
      console.log(this.Isloading);
      
      this.Isloading = res;
    });
  }

  ngOnInit() {
    this.userserv.IsLoggedIn();
    // this.userserv.logoutOnExpiry()
  }
}
