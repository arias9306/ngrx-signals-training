import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly URL = 'http://localhost:3000/api/v1/todo';

  private readonly http = inject(HttpClient);

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.URL);
  }

  createTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(this.URL, todo);
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.URL}/${id}`);
  }

  updateTodo(todo: Partial<Todo>) {
    return this.http.patch<Todo>(`${this.URL}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
