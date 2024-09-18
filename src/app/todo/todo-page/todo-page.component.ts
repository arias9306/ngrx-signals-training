import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoStore } from '../todo.state';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    TodoListComponent,
    TodoFormComponent,
  ],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css',
  providers: [TodoStore],
})
export class TodoPageComponent {
  opened: boolean = true;
  private readonly store = inject(TodoStore);

  create() {
    this.store.setTodo({ id: 0, name: '', isCompleted: false });
  }
}
