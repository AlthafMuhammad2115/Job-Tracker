import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HomeComponent } from '../../pages/home/home.component';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrl: './filter-box.component.css',
})
export class FilterBoxComponent {
  location: any = '';
  skills: any = '';
  endRange: any;
  startRange: any;
  @Output() valueSent = new EventEmitter<any>();

  constructor(private homeComp:HomeComponent){}
  // ranges
  public rangeList = [
    { startRange: 0, endRange: 5000 },
    { startRange: 5001, endRange: 10000 },
    { startRange: 10001, endRange: 20000 },
    { startRange: 20001, endRange: 30000 },
    { startRange: 30001, endRange: 50000 },
  ];

  // set range of select salary
  setrange(event: Event) {
    const index: any = (event.target as HTMLSelectElement).value;

    if (index == -1) {
      this.startRange =0
      this.endRange =Number.MAX_SAFE_INTEGER
    } else {
      this.startRange = this.rangeList[index].startRange;
      this.endRange = this.rangeList[index].endRange;
    }

    console.log('hai');
  }

  // send the all search data values to parent
  SendValue() {
    const value = {
      location: this.location,
      skill: this.skills,
      salary: {
        startRange: this.startRange,
        endRange: this.endRange,
      },

    };
    
    if(value) this.homeComp.Isfilteropen=false;

    this.valueSent.emit(value);
  }
}
