import { Gif, SearchGifsResponse } from './../interfaces/gifs.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'UD3ZCqpvchDmgfYjKtgNcXneuKUmIsPn';
  private _servicioUrl :string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados:Gif[] = []
  constructor(private client: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

   }

  get historial() {
    return [...this._historial];
  }

 
  buscarGifs(query: string) {

    query = query.toLowerCase();

    if (!this.historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
        .set('api_key',this._apiKey)
        .set('q', query)
        .set('limit','10');


    this.client.get<SearchGifsResponse>(`${this._servicioUrl}/search`,{params})
      .subscribe((respuesta) => {
        console.log(respuesta);
        this.resultados = respuesta.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

  }

}
