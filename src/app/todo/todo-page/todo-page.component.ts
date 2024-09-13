import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [TodoListComponent, MatToolbarModule],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css',
})
export class TodoPageComponent {}
