import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { Task } from 'src/app/pages/tasklist/task';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private firestore: Firestore) {}


  getList() {
    const notesRef = collection(this.firestore, 'tareas');
    return collectionData(notesRef);
  }

  add(task:Task) {
    const notesRef = collection(this.firestore, 'tareas');
    return addDoc(notesRef, task);
  }

  delete(task:Task) {
    console.log(task);
    const itemRef = doc(this.firestore,`tareas/${task.id}`);
    return deleteDoc(itemRef);
  }

  update(task: Task) {
    const taskData = { title: task.title, status: task.status };
    const itemRef = doc(this.firestore,`tareas/${task.title}`);
    return updateDoc(itemRef, taskData);
  }
}