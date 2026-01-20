import { Component } from '@angular/core';
import { signal } from '@angular/core';

//TODO FORM CONTROL
@Component({
  selector: 'app-labs',
  imports: [],
  templateUrl: './labs.html',
  styleUrl: './labs.css',
})
export class Labs {

  welcome = "Hola";
    tasks = signal([
    'Instalar Angular',
    'Ver que podemos movernos entre versiones',
    'Crear proyecto'
  ]);

  name  = 'Cristina';
  age = 32;
  disabled = "false";
  img = 'https://media.istockphoto.com/id/1455446060/es/vector/garabatos-de-gatos-planos-divertidos-gatos-de-piel-y-gatitos-mascotas-lindas-personajes.jpg?s=1024x1024&w=is&k=20&c=d9u6NP89ZhojR6jkmSKtGFrXzeCCDTYgk3BFwYPNJl4=';

  //TODO SIGNAL
  person = {
    name: 'Cristina',
    age: '32',
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQomIGVGOuYrHDMlGwbEKcYemoH5LHS_BV7qg&s',
  }

  clickhandler(){
    alert('Hola')
  }

  changehandler(event: Event){
    console.log(event)
  }

}
