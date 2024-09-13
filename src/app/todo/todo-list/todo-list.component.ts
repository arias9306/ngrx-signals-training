import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { TodoStore } from '../todo.state';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatListModule, JsonPipe, MatButtonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  private readonly store = inject(TodoStore);
  todos = this.store.todos;
  size = this.store.count;

  selected = this.store.selectedTodo;
  err = this.store.error;

  add() {
    this.store.getTodoById(3);
  }
}
