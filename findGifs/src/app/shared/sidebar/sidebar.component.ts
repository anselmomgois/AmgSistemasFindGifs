import { GifsService } from './../../gifs/services/gifs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService){}

  get historial() : string[] {
    return this.gifsService.historial
  }

  buscar(termino:string)
  {
    console.log(termino);
     this.gifsService.buscarGifs(termino);
  }
}
