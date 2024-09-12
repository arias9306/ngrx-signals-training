import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.routes').then((r) => r.todoRoutes),
  },
  {
    path: 'recipe',
    loadChildren: () =>
      import('./recipe/recipe.routes').then((r) => r.recipeRoutes),
  },
];
