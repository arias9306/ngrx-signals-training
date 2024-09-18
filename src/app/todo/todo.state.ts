import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { SelectEntityId } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';
import { withCrud } from '../crud.store';
import { Todo } from './model/todo.model';
import { TodoService } from './todo.service';

interface TodoState {
  todos: Todo[];
  selectedTodo: Todo | null;
  loading: boolean;
  error: string | null | Error;
  filter: { criteria: string; asending: boolean };
  _secret: string;
}

const initialState: TodoState = {
  todos: [],
  selectedTodo: null,
  loading: false,
  error: null,
  filter: {
    criteria: '',
    asending: true,
  },
  _secret: 'Soy el secreto',
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState<TodoState>(initialState),
  withComputed((store) => ({
    count: computed(() => store.todos().length),
  })),
  withMethods((store, todoService = inject(TodoService)) => ({
    getAllTodos: rxMethod<void>(
      pipe(
        switchMap(() =>
          todoService.getAllTodos().pipe(
            tapResponse({
              next: (todos) => patchState(store, { todos }),
              error: (err) => {
                console.log(err);
                patchState(store, { error: 'Algo Paso' });
              },
            })
          )
        )
      )
    ),
    getTodoById: rxMethod<number>(
      pipe(
        switchMap((id) =>
          todoService.getTodoById(id).pipe(
            tapResponse({
              next: (todo) => patchState(store, { selectedTodo: todo }),
              error: (err: any) => {
                console.log(err.error);
                patchState(store, {
                  error: err.error.message,
                });
              },
            })
          )
        )
      )
    ),
    createTodo: rxMethod<Partial<Todo>>(
      pipe(
        switchMap((todo) =>
          todoService.createTodo(todo).pipe(
            tapResponse({
              next: (todo) => {
                patchState(store, (state) => ({
                  todos: [...state.todos, todo],
                }));
              },
              error: (err) => {
                console.log(err);
                patchState(store, { error: 'Algo Paso' });
              },
            })
          )
        )
      )
    ),
    updateTodo: rxMethod<Partial<Todo>>(
      pipe(
        switchMap((todo) =>
          todoService.updateTodo(todo).pipe(
            tapResponse({
              next: (todo) => {
                patchState(store, (state) => ({
                  todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
                }));
              },
              error: (err) => {
                console.log(err);
                patchState(store, { error: 'Algo Paso' });
              },
            })
          )
        )
      )
    ),
    deleteTodo: rxMethod<number>(
      pipe(
        switchMap((id) =>
          todoService.deleteTodo(id).pipe(
            tapResponse({
              next: () => {
                patchState(store, (state) => ({
                  todos: state.todos.filter((t) => t.id !== id),
                }));
              },
              error: (err) => {
                console.log(err);
                patchState(store, { error: 'Algo Paso' });
              },
            })
          )
        )
      )
    ),
    mas1: rxMethod<number>(
      pipe(
        map((n) => n + 1),
        tap((result) => console.log(result))
      )
    ),
    setTodo: rxMethod<Todo>(
      pipe(tap((todo) => patchState(store, { selectedTodo: todo })))
    ),
  })),
  withHooks((store) => ({
    onInit: () => {
      console.log('onInit');
      store.getAllTodos();
    },
    onDestroy: () => {
      console.log('onDestroy');
      // Do something
    },
  }))
);
const selectId: SelectEntityId<Todo> = (todo) => todo.id;
export const TodoCrud = signalStore(withCrud<Todo>(TodoService, selectId));
