import { Component, Input, signal } from '@angular/core';
import { Task } from '../../models/taskmodel';
import { JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

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

  newTaskCtrl =  new FormControl('', {
    nonNullable: true,
    
    validators: [
      Validators.required,
    ]
  });

  onNewTaskInput() {
      if (this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
      
    }
  };

  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      complete: false,
    };
    
    this.tasks.update((prevTasks) => [...prevTasks, newTask]);

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

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => {
    return tasks.map((task, position) => {
      if (position === index) {
        return {
          ...task,
          editing: true
        };
      }
      return {
        ...task,
        editing: false
      };
    });
  });
  }

  updateTaskEditingText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) => {
    return tasks.map((task, position) => {
      if (position === index) {
        return {
          ...task,
          title: input.value,
          editing: false
        };
      }
      return task;
    });
  });
  }


}
