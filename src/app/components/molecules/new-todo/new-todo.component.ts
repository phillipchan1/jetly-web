import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TodosService } from "../../../services/todos/todos.service";
import { FormsModule } from "@angular/forms";
import { Todo } from "../../../services/todos/todos.model";
import { AuthService } from "../../../services/auth/auth.service";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "angularfire2/firestore";

@Component({
  selector: "new-todo",
  templateUrl: "./new-todo.component.html",
  styleUrls: ["./new-todo.component.scss"]
})
export class NewTodoComponent implements OnInit {
  @Output() onBlur = new EventEmitter<boolean>();
  placeholderText: string = `Press 'Enter' to add`;
  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    public todosService: TodosService
  ) {}
  private todosCollection: AngularFirestoreCollection<Todo>;
  name: string;

  addTodo(name) {
    const todo: Todo = {
      onBoard: true,
      complete: false,
      createdOn: Date.now(),
      name: name,
      description: "",
      lane: "todo",
      previousLane: "",
      startOn: Date.now(),
      timeSpentinProgress: 0,
      userId: this.authService.getUser().uid
    };

    this.todosService.addTodo(todo);
  }

  newTodoBlur(event) {
    this.onBlur.emit(true);
  }

  ngOnInit() {}
}
