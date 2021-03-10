import { Component, OnInit } from '@angular/core';
import { Libro } from '../libro';
import { LibroService } from '../libro.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  libros: Libro[];

  constructor(private libroService: LibroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getLibros();
    this.addLibros();
  }

  getLibros(): void{
    this.libroService.getLibros()
        .subscribe(libros => this.libros = libros);
  }

  addLibros(): void{
    let libros = this.libroService.getNuevosLibros();
    if(libros!=null){
      for(let i=0; i<libros.length; i++){
        this.libros.push(libros[i]);
      }
    }
  }

  //Se le pasa el id del libro a borrar
  borrar(id: number): void{
    for(let i=0; i<this.libros.length; i++){
      if(this.libros[i].id==id){
        this.messageService.add('Se ha eliminado el libro: ' + this.libros[i].titulo);
        this.messageService.setType("success");
        this.libros.splice(i,1);
      }
    }
  }
}