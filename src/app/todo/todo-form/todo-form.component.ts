import { Component, effect, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Todo } from '../model/todo.model';
import { TodoStore } from '../todo.state';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class TodoFormComponent {
  private readonly store = inject(TodoStore);

  selectedTodo = this.store.selectedTodo;

  private fb = inject(FormBuilder);
  todoForm = this.fb.group({
    name: ['', Validators.required],
    id: [0],
  });

  setValue = effect(() => {
    this.todoForm.patchValue({
      name: this.selectedTodo()?.name,
      id: this.selectedTodo()?.id,
    });
  });

  onSubmit(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const form = this.todoForm.getRawValue();

    if (form.id && form.id > 0) {
      const todo: Partial<Todo> = {
        name: form.name ?? '',
        isCompleted: false,
        id: form.id,
      };

      this.store.updateTodo(todo);
    } else {
      const todo: Partial<Todo> = {
        name: form.name ?? '',
        isCompleted: false,
      };

      this.store.createTodo(todo);
    }
  }
}
