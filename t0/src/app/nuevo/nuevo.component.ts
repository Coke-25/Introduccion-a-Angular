import { Component, OnInit } from '@angular/core';
import { Libro } from '../libro';
import { LibroService } from '../libro.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  libros: Libro[];

  nuevoLibro: Libro = {
    id: 0,
    titulo: "",
    autor: "",
    descripcion: ""
  };

  constructor(private libroService: LibroService, private messageService: MessageService) { }

  ngOnInit(): void {
    //Se obtienen todos los libros de la lista
    this.getLibros();
    //Se descubre el ultimo indice del array
    let ultimoIndice = this.libros.length - 1;
    //Si no hay libros, el nuevo id se pone en 1
    if(ultimoIndice<0){
      this.nuevoLibro.id = 1;
    } else {
      //Se muestra el id del nuevo libro crear, que será uno más que el último de la lista.
      let nuevoId = this.libros[ultimoIndice].id + 1;
      this.nuevoLibro.id = nuevoId;
    }
  }

  agregarNuevo(){
    /**
     * Se crea un nuevo objeto libro para que al limpiar los input no se envíe el libro vacío,
     * así que estos datos se recogen de la zona en la que se muestran por pantalla y se meten en el
     * nuevo objetoLibro para enviarlo.
     */

    let valorId = document.getElementById('valorId');
    let valorTitulo = document.getElementById('valorTitulo');
    let valorAutor = document.getElementById('valorAutor');
    let valorDescripcion = document.getElementById('valorDescripcion');

    if(valorTitulo==null||valorAutor==null){
      this.messageService.add("Hay que rellenar los campos Título y Autor");
      this.messageService.setType("warning");
    } else {
      //Se incrementa en 1 el id del libro a crear
      this.nuevoLibro.id++;
      
      let objetoLibro = {
        id: 0,
        titulo: "",
        autor: "",
        descripcion: ""
      }

      objetoLibro.id = Number(valorId.innerText);
      objetoLibro.titulo = valorTitulo.innerText;
      objetoLibro.autor = valorAutor.innerText;
      
      //Se envía cadena vacía si no se añade descripción
      let descripcion = "";
      if(valorDescripcion!=null){
        descripcion = valorDescripcion.innerText;
      }
      objetoLibro.descripcion = descripcion;
      
      this.libroService.sendLibro(objetoLibro);
      this.messageService.add(`El libro '${valorTitulo.innerText}' se ha añadido correctamente`);
      this.messageService.setType("success");

      this.nuevoLibro.titulo = "";
      this.nuevoLibro.autor = "";
      this.nuevoLibro.descripcion = "";
    }
  }


  getLibros(): void{
    this.libroService.getLibros()
        .subscribe(libros => this.libros = libros);
  }

}