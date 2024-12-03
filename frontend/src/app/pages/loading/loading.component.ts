import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  Isloading: boolean=false;
  constructor(private loadingserv:LoadingService){
    loadingserv.loading.subscribe((res)=>{
      this.Isloading=res
    })
  }
  
}
