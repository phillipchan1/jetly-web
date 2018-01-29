import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange
} from "@angular/core";
import { Todo } from "../../../../services/todos/todos.model";
import { TodosService } from "../../../../services/todos/todos.service";

@Component({
  selector: "todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
  constructor(public todosService: TodosService) {}
  @Input() todo: Todo;
  complete = false;

  changeName(event, todo) {
    const newName = event.target.innerText;

    if (todo.name !== newName) {
      this.todosService.updateTodo(todo.id, {
        name: newName
      });
    }
  }

  completeStatusChange(status: boolean, todo: Todo) {
    if (status === true) {
      this.todosService.updateTodo(todo.id, {
        complete: status,
        completedOn: Date.now(),
        lane: "complete",
        previousLane: todo.lane
      });

      // if you uncheck it
    } else {
      this.todosService.updateTodo(todo.id, {
        complete: status,
        completedOn: "",
        lane: todo.previousLane
      });
    }
  }

  ngOnInit() {}
}
