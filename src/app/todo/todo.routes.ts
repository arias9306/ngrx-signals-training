import { Routes } from '@angular/router';
import { TodoPageComponent } from './todo-page/todo-page.component';

export const todoRoutes: Routes = [
  {
    path: '',
    component: TodoPageComponent,
    // providers: [TodoStore]
  },
];
