import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-admin-job-detials',
  templateUrl: './admin-job-detials.component.html',
  styleUrl: './admin-job-detials.component.css',
})
export class AdminJobDetialsComponent {
  jobarray: any;
  jobid!: any;
  menudata: any;
  lastdate!: string;
  postdate!: string;
  constructor(private ar: ActivatedRoute, private adminserv: AdminService,private jobserv:JobService,private route:Router) {
    adminserv
      .adminlistjobs(adminserv.getUserFromLocalStorage('admin').userid)
      .subscribe((res: any) => {
        this.jobid = ar.snapshot.paramMap.get('job_id');
        this.jobarray = res.jobs;

        if (this.jobid) {
          this.menudata = this.jobarray.filter((value: any) => {
            this.lastdate = this.formatDateToDDMMYYYY(value.last_date);
            this.postdate = this.formatDateToDDMMYYYY(value.posted_date);
            return value._id == this.jobid;
          });
        }

        console.log('menudata', this.menudata);
      });
  }

  formatDateToDDMMYYYY(dateString: string): string {
    // Create a Date object from the ISO string
    const date = new Date(dateString);

    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    // Return the formatted date
    return `${day}/${month}/${year}`;
  }

  deletejob(job_id:any){
    this.jobserv.delete_job(job_id).subscribe((res:any)=>{
      if(res.message=="Job application deleted successfully"){
        this.route.navigateByUrl('/adminDashboard/'+this.adminserv.getUserFromLocalStorage('admin').userid)
      }
      
    })
  }
}
