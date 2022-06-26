import {
  Get,
  Controller,
  Param,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Header,
  Patch,
  Delete,
} from '@nestjs/common';
import { ChangeTodo } from './dto/change-todo.dto';
import { CreateTodo } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos() {
    return this.todoService.findeALl();
  }
  @Get(':id')
  getOneTodo(@Param('id') id: string) {
    return this.todoService.findeOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createTodo(@Body() createTodo: CreateTodo) {
    return this.todoService.create(createTodo);
  }

  @Patch(':id')
  changeTodo(@Body() changeTodo: ChangeTodo, @Param('id') id: string) {
    return this.todoService.update(id, changeTodo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
