import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Libro } from './libro';
import { LIBROS } from './conjuntoLibros';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  librosEspera: Libro[] = [];

  constructor() { }

  getLibros(): Observable<Libro[]> {
    return of(LIBROS);
  }
  sendLibro(libro: Libro){
    this.librosEspera.push(libro);
  }
  getNuevosLibros(): Libro[]{
    let auxLibro = this.librosEspera;
    this.librosEspera = [];
    return auxLibro;
  }

}