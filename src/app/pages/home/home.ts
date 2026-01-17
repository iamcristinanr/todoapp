import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  tasks = signal([
    'Instalar Angular',
    'Ver que podemos movernos entre versiones',
    'Crear proyecto'
  ])

  newTask = '';

  onNewTaskInput(event: Event): void {
      const value = (event.target as HTMLInputElement).value;
      this.newTask = value;
  }
  
}
