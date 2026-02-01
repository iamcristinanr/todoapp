import { Component, Injector, signal, computed, effect, inject } from '@angular/core';
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

  
  tasks = signal<Task[]>([])

  newTask = signal('');

  //State type formControl
  newTaskCtrl =  new FormControl('', {
    nonNullable: true,
    
    validators: [
      Validators.required,
    ]
  });

  constructor() {
  }

  //Get state tasks when start app
  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if (storage) {
      //deserializer to string of items 
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  injector = inject(Injector);

  trackTasks () {
    //effect run with state initial empty array we must run after read storage we must create method trackTasks
    effect(() => {
      const tasks = this.tasks();
      //With this save state but we need get it from start app with init
      //Not save array directly, only string with JSON
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector : this.injector});
  }

  //State type filter from other state or signal <ONLY ALLOWS>
  filter = signal< 'All' | 'Pending' | 'Completed' >('All');

  //everytime change filter or tasks this function will be execute or calculate new state
  taskbyFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if (filter === 'Pending') {
      return tasks.filter(task => !task.complete)
    }
    if (filter === 'Completed') {
      return tasks.filter(task => task.complete)
    }

    return tasks;
  })

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

  // <ONLY ALLOWS>
  changeFilter (filter : 'All' | 'Pending' | 'Completed') {
    this.filter.set(filter)
  }


}
