import { Component } from '@angular/core';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrl: './view-applicants.component.css'
})
export class ViewApplicantsComponent {
  public statusToggle:boolean=false;
  public boolArray:boolean[]=[false,false,false,false];
  public curStr:string="applied"
  public status:string[]=['Applied', 'Interviewing', 'Offered', 'Rejected'];


  toggleStatusOn(){
    this.statusToggle=true;
  }
  toggleStatusOff(){
    this.statusToggle=false;
  }

  change(index:number){
    this.boolArray[index]=true
    for(let i=0;i<this.boolArray.length;i++){
      if(i!=index)this.boolArray[i]=false
    }
    this.curStr=this.status[index]

  }

}
