import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';
import { Task } from './task';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {
  tasks: Array<Task> = [];
  task:Task={
    title: '',
    status: 'open',
    id: ''
  };
  
  constructor(private CrudService: CrudService) {}

ngOnInit() {
    this.CrudService.getList().subscribe((res) => {
      this.tasks = [];
      res.forEach((element) => {
        let task = {
          title: element['title'],
          status: element['status'],
          id: element['id']
        };
        this.tasks.push(task);
      });
    });
  }


  addTask() {
    let theNewTask: string | null = prompt('New task');
    if (theNewTask) {
      this.task.title = theNewTask;
      this.CrudService.add(this.task).then(() => {
        this.task = { title: '', status: 'open', id: '' };
      });
    }
  }

  markAsDone(slidingItem: IonItemSliding, task: Task) {
    task.status = 'done';
    this.CrudService.update(task).then(() => {
      slidingItem.close();
    });
  }

  removeTask(slidingItem: IonItemSliding, task: Task) {
    this.CrudService.delete(task).then(() => {
      let index = this.tasks.indexOf(task);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
      slidingItem.close();
    });
  }
}