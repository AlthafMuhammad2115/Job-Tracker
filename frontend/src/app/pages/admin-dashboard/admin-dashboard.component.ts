import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  jobarray: any = [];
  company_name: string = '';
  constructor(private adminserv: AdminService, private userserv: UserService,private toast:ToastrService) {
    adminserv
      .adminlistjobs(adminserv.getAdminFromLocalStorage('admin').userid)
      .subscribe(
        (res: any) => {
          this.jobarray = res.jobs;
          console.log(this.jobarray);
        },
        (err) => {
          this.toast.error(err.error.message);
        }
      );

    this.company_name =
      adminserv.getAdminFromLocalStorage('admin').company_name;
  }
}
