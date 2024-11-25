import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public jobarray:any=[]
  constructor(private jobServ:JobService){
    jobServ.list_all_jobs().subscribe((res)=>{
      this.jobarray=res
    })
  }
}
