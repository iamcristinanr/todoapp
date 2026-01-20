import { Component, Input, signal } from '@angular/core';
import { Task } from '../../models/taskmodel';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [JsonPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  //TODO OBJETC
  tasks = signal<Task[]>([
    {
      id: 1,
      title: "Crear proyecto",
      complete: false
    },
    {
      id: 2,
      title: "Aprender sintaxis",
      complete: false
    },
  ])

  newTask = signal('');

  //TODO FORM CONTROL
  onNewTaskInput(event: Event): void {
      const value = (event.target as HTMLInputElement).value;
      this.newTask.set(value);
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      complete: false,
    };
    
    this.tasks.update((prevTasks) => [...prevTasks, newTask]);

    this.newTask.set('');
  }

  deleteTask(index: number): void {
    this.tasks.update(tasks => tasks.filter((task, position) => position !== index));
  }

  updateTask(index: number) {
  this.tasks.update((tasks) => {
    return tasks.map((task, position) => {
      if (position === index) {
        return {
          ...task,
          complete: !task.complete
        };
      }
      return task;
    });
  });

  }
}
