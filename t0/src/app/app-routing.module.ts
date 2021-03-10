import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibrosComponent } from './libros/libros.component';
import { NuevoComponent } from './nuevo/nuevo.component';

const routes: Routes = [
  { path: 'libros', component: LibrosComponent },
  { path: 'nuevo', component: NuevoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }