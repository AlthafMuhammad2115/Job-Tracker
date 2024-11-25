import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-tile',
  templateUrl: './job-tile.component.html',
  styleUrl: './job-tile.component.css'
})
export class JobTileComponent {
  @Input() btnName!:String;
  @Input() route1!:any;
  @Input() route2!:any;
}
