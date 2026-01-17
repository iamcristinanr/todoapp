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

  newTask = signal('');

  onNewTaskInput(event: Event): void {
      const value = (event.target as HTMLInputElement).value;
      this.newTask.set(value);
  }

  addTask(): void {
    const value = this.newTask().trim();
    if (!value) return;

    this.tasks.update(tasks => [...tasks, value]);
    this.newTask.set('');
  }

}
