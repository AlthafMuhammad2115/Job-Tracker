import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-job-tile',
  templateUrl: './job-tile.component.html',
  styleUrl: './job-tile.component.css'
})
export class JobTileComponent {
  @Input() btnName!:String;
  @Input() route1!:any;
  @Input() route2!:any;
  @Input() role!:any;
  @Input() company!:any;
  @Input() location!:any; 
  @Input() salary!:any;
  @Input() post!:any;
  @Input() job_id!:string
  @Input() company_id!:string

  constructor(private userserv:UserService,private route:Router,private applserv:ApplicationService,private adminserv:AdminService){}
  applynow(){
    let user: any;
    let admin: any;
    admin = this.adminserv.getUserFromLocalStorage('admin');
    user = this.userserv.getUserFromLocalStorage('user');

    if (user) {
      user = this.userserv.getUserFromLocalStorage('user').userid;
    } else if(!admin && !user ) {
      this.route.navigateByUrl('/login');
      return;
    }
    console.log(user);

    let userid = {
      user_id: user,
    };
    this.applserv
      .add_applicant(userid, this.job_id, this.company_id)
      .subscribe((res) => {
        console.log(res);
        
      });
  }



}
