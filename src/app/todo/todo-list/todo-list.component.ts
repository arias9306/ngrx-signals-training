import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todos: Todo[] = [];
}
