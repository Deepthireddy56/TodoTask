import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TodoTask';
  todoForm: FormGroup;
  tasks: { name: string; completed: boolean }[] = [];    // Array to store tasks

// Constructor for initializing services and setting up the form
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.todoForm = this.fb.group({
      task: ['', Validators.required],
    });
  }
// Method to add a new task and Check if the form is valid or not
  addTask() {
    if (this.todoForm.valid) {
      this.tasks.push({
        name: this.todoForm.value.task,    //getting the value from the task
        completed: false,                 //new tasks are not completed by default so we given false
      });
      this.toastr.success('Task added successfully!', 'Success');
      this.todoForm.reset();
    } else {
      this.toastr.error('Please enter a valid task.', 'Error');   // Showing error notification if the form is invalid
    }
  }
// Method to delete a task by its index and removing task from the array
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.toastr.warning('Task deleted.', 'Deleted');
  }

 // Method to toggle the completion status of a task (Here i am toggling a task's state between "completed" and "not completed.")
  taskCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    const status = this.tasks[index].completed ? 'completed' : 'marked incomplete';
    this.toastr.info(`Task ${status}.`, 'Info');
  }
}
