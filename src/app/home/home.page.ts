import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { title } from 'process';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public todos: Array<Todo> = [];
  note : string;
  title : string;
  constructor(public todoService: TodoService,public alertController: AlertController) {
    
  }
  async ngOnInit(){

    this.todos = await this.todoService.read();

  }
  showPrompt() {
    this.alertController.create({
      header: 'Deleting items',
      subHeader: '',
      message: 'Are you sure you want to delete this item',
      
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Yes',
          handler: (data: any) => {
            console.log('Saved Information', data);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
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
  }

  deleteTask(index){
    this.todos.splice(index, 1);
  }

  updateTask(index) {
    let alert = this.alertController.create({
      header: 'Update Task?',
      message: 'Type in your new task to update.',
      inputs: [{ name: 'title', placeholder: 'Title' },
      { name: 'note', placeholder: 'Description' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
                { text: 'Update', handler: data => {  
                  this.todos[index] = data.title;
                  this.todos[index] = data.note; }}]
    }).then(res => {
      res.present();
    });
  }
}