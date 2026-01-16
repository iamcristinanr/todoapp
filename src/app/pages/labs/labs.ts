import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  imports: [],
  templateUrl: './labs.html',
  styleUrl: './labs.css',
})
export class Labs {

    welcome = "Hola";
    tasks = [
    'Instalar Angular',
    'Ver que podemos movernos entre versiones',
    'Crear proyecto'
  ]

}
