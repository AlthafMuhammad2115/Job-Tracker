import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-tile',
  templateUrl: './status-tile.component.html',
  styleUrl: './status-tile.component.css'
})
export class StatusTileComponent {
  @Input() role!:string;
  @Input() company!:string;
  @Input() status!:string;
  @Input() id!:any;
}
