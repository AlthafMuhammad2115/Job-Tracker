import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrl: './view-applicants.component.css',
})
export class ViewApplicantsComponent {
  public statusToggle: boolean = false;
  public boolArray: boolean[] = [false, false, false, false];
  public curStr: string = 'Applied';
  public status: string[] = ['Applied', 'Interviewing', 'Offered', 'Rejected'];
  applicantarray: any;
  applied_date: any = [];
  job_id: string | null;
  constructor(
    private ar: ActivatedRoute,
    private applserv: ApplicationService,
    private adminserv: AdminService
  ) {
    this.job_id = ar.snapshot.paramMap.get('job_id');

    if (this.job_id) {
      applserv
        .list_applicants(
          adminserv.getUserFromLocalStorage('admin').userid,
          this.job_id
        )
        .subscribe((res: any) => {
          this.applicantarray = res.applicants;
          console.log(this.applicantarray);

          for (let i = 0; i < this.applicantarray.length; i++) {
            this.applied_date[i] = this.formatDateToDDMMYYYY(
              this.applicantarray[i].applied_date
            );
          }
        });
    }
  }

  toggleStatusOn() {
    this.statusToggle = true;
  }
  toggleStatusOff() {
    this.statusToggle = false;
  }

  updatestatus() {
    // let form = {
    //   user_id: my_user_id,
    //   status: this.curStr,
    // };

    // console.log(this.curStr);
    
    this.toggleStatusOff();
    // this.applserv
    //   .update_status(
    //     this.adminserv.getUserFromLocalStorage('admin').userid,
    //     this.job_id,
    //     form
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //   });

  }
  change(index: number) {
    this.boolArray[index] = true;
    for (let i = 0; i < this.boolArray.length; i++) {
      if (i != index) this.boolArray[i] = false;
    }
    this.curStr = this.status[index];
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
}
