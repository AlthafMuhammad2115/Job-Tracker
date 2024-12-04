import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css',
})
export class PostJobComponent {
  my_skill: string = '';
  postForm;
  issubmit: boolean = false;
  company_id: any;
  skillsUserArray: any;
  constructor(
    private jobserv: JobService,
    private fb: FormBuilder,
    private adminserv: AdminService,
    private route: Router,
    private toast: ToastrService,
    private ar: ActivatedRoute
  ) {
    this.company_id = adminserv.getAdminFromLocalStorage('admin').userid;

    this.postForm = this.fb.group({
      company_id: [this.company_id, Validators.required],
      job_title: ['', [Validators.required]],
      location: ['', Validators.required],
      salary: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      skill: this.fb.array([], Validators.required),
      post_no: ['', Validators.required],
      posted_date: [new Date(), Validators.required],
      last_date: ['', Validators.required],
    });
  }

  get skillArray() {
    return this.postForm.get('skill') as FormArray;
  }

  get f() {
    return this.postForm.controls;
  }
  onsubmit() {
    let path = this.ar.snapshot.routeConfig?.path;

    this.issubmit = true;
    if (this.postForm.invalid) return;

    if (path == 'postjob') {
      this.jobserv.create_job(this.postForm.value).subscribe(
        (res) => {
          console.log(res);
          this.route.navigateByUrl('/adminDashboard/' + this.company_id);
          this.toast.success('Job Posted', '', {
            timeOut: 1000,
          });
        },
        (err) => {
          this.toast.error(err.error.message);
        }
      );
    }
  }

  onadd(newSkill: HTMLInputElement) {
    const skill = newSkill.value.trim();
    this.skillArray.push(this.fb.control(skill, Validators.required));
    newSkill.value = '';
    this.skillsUserArray = this.skillArray.value;
  }
  deleteSkills(index: number) {
    this.skillArray.removeAt(index);
    this.skillsUserArray = this.skillArray.value;
  }
}
