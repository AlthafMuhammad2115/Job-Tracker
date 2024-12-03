import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  skill: any;
  salary: any;
  location: any;
  Isfilteropen: boolean = false;

  IsUserLoggedIn!:boolean;

  public jobarray: any[] = [];
  public applicationArray: any[] = [];
  filterdata: any;
  constructor(private jobServ: JobService,private userServ:UserService) {
    // listt all job``
    jobServ.list_all_jobs().subscribe((res: any) => {
      console.log(res);

      this.jobarray = res;
    });

    // list all applied jobs of applicant
    this.IsUserLoggedIn=userServ.IsLoggedIn()
    if(this.IsUserLoggedIn){
      const userid=userServ.getUserFromLocalStorage('user').userid
      userServ.viewuserapplication(userid).subscribe((res:any)=>{
        this.applicationArray=res;
        console.log(this.applicationArray);
        this.jobarray=this.updateJobApplicationStatus(this.jobarray,this.applicationArray)
        console.log("newly set",this.jobarray);
        
        
      })


    }else{

    }
  }
  filteropen() {
    this.Isfilteropen = true;
  }
  filterclose() {
    this.Isfilteropen = false;
  }

  recieveValues(value: any) {
    let filterdata = value;
    console.log(filterdata);

    this.jobServ.filter_job(filterdata).subscribe((res:any)=>{
      this.jobarray=this.updateJobApplicationStatus(res.data,this.applicationArray)
    })
    
  }

  // reset job array if user logged in and applied
  updateJobApplicationStatus(jobs:any, applications:any) {
    const appliedJobIds = new Set(applications.map((app:any) => app.job_id._id));
  
    return jobs.map((job:any) => {
      return {
        ...job,
        isApplied: appliedJobIds.has(job.job_id)
      };
    });
  }
}
