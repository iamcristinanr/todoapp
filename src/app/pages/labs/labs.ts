import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

//TODO FORM CONTROL
@Component({
  selector: 'app-labs',
  imports: [ReactiveFormsModule],
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

  name  = signal('Cristina');
  age = signal(32);
  disabled = "false";
  img = 'https://media.istockphoto.com/id/1455446060/es/vector/garabatos-de-gatos-planos-divertidos-gatos-de-piel-y-gatitos-mascotas-lindas-personajes.jpg?s=1024x1024&w=is&k=20&c=d9u6NP89ZhojR6jkmSKtGFrXzeCCDTYgk3BFwYPNJl4=';

  person = signal({
    name: 'Cristina',
    age: 32,
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQomIGVGOuYrHDMlGwbEKcYemoH5LHS_BV7qg&s',
  })

  colorCtrl = new FormControl();
  // CTRL BY HTML.

  widthCtrl = new FormControl(50, {
    nonNullable: true,
  });

  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value)
    })
  };

  clickhandler(){
    alert('Hola')
  }

  changehandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue)
  }

  changeAgess(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.age.set(parseInt(newValue, 10) || 0);
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return{...prevState,
        age: parseInt(newValue)
      }
    });
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return{...prevState,
        name: newValue
      }
    });
  }

}
