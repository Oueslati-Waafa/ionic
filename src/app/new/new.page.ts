import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
 public todos: Array<Todo> = [];
 title: string;
 note : string;
 ionicForm: FormGroup;
 isSubmitted = false;
  constructor(public todoService: TodoService,public formBuilder: FormBuilder) {}
  ngOnInit(){

    //this.todos = await this.todoService.read();
    this.ionicForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      note: ['', [Validators.required, Validators.minLength(2)]],
    })
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
    }
  }

  getIcon(todo){
    if(todo.completed) return 'checkmark-circle';
    else return 'stopwatch';
  }
  public async createTodo(){
    let key = await this.todoService.generateKey();
    let todo = {
      title: this.title,
      note: this.note,
      completed: true
    };
    await this.todoService.create(key,todo);
    this.todos = await this.todoService.read();
    console.table(todo);
    
  }
}
