import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css',
})
export class PostJobComponent {
  my_skill: string = '';
  postForm;
  issubmit: boolean=false;
  company_id: any;
  constructor(private jobserv: JobService, private fb: FormBuilder,private adminserv:AdminService,private route:Router) {
   this.company_id=adminserv.getUserFromLocalStorage('admin').userid

    this.postForm = this.fb.group({
      company_id:[this.company_id,Validators.required],
      job_title: ['', [Validators.required]],
      location: ['', Validators.required],
      salary: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      skill: [this.skillarray,Validators.required],
      post_no: ['', Validators.required],
      posted_date: [new Date(), Validators.required],
      last_date: ['', Validators.required],
    });
  }

  skillarray:string[]=[];

  get f(){
    return this.postForm.controls
  }
  onsubmit() {

    this.issubmit=true;
    if(this.postForm.invalid)return;

    this.jobserv.create_job(this.postForm.value).subscribe((res)=>{
      console.log(res);
      this.route.navigateByUrl('/adminDashboard/'+this.company_id)

      
    })
  }

  onadd(skill: any) {
    console.log('value', skill);
    this.skillarray?.push(skill);
  }
}
