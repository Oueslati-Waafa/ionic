import { Component, OnInit } from '@angular/core';

import { NavController, AlertController } from '@ionic/angular';
import { Todo } from '../todo';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  public todos: Array<Todo> = [];
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) { }

  ngOnInit() {
  }
  updateTask(index) {
    let alert = this.alertCtrl.create({
      header: 'Update Task?',
      message: 'Type in your new task to update.',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
                { text: 'Update', handler: data => {  
                  this.todos[index] = data.editTask; }}]
    }).then(res => {
      res.present();
    });
  }
}
