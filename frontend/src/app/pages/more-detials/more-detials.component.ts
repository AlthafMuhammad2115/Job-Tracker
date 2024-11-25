import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { ApplicationService } from '../../services/application.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-more-detials',
  templateUrl: './more-detials.component.html',
  styleUrl: './more-detials.component.css',
})
export class MoreDetialsComponent {
  public jobarray: any;
  public menudata: any = [];
  lastdate: string = '';
  postdate: string = '';
  constructor(
    private ar: ActivatedRoute,
    private jobserv: JobService,
    private applserv: ApplicationService,
    private userserv: UserService,
    private route: Router
  ) {
    jobserv.list_all_jobs().subscribe((res) => {
      this.jobarray = res;
      let job_id = ar.snapshot.paramMap.get('job_id');

      if (job_id) {
        this.menudata = this.jobarray.filter((value: any) => {
          this.lastdate = this.formatDateToDDMMYYYY(value.last_date);
          this.postdate = this.formatDateToDDMMYYYY(value.posted_date);

          return value._id == job_id;
        });
      }
    });

    console.log(this.menudata);
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

  applynow(job_id: string, company_id: string) {
    let user: any;
    if (this.userserv.getUserFromLocalStorage('user')) {
      user = this.userserv.getUserFromLocalStorage('user').userid;
    } else {
      this.route.navigateByUrl('/login');
      return;
    }
    console.log(user);

    let userid = {
      user_id: user,
    };
    this.applserv
      .add_applicant(userid, job_id, company_id)
      .subscribe((res) => {});
  }

  ngOnInit() {}
}
