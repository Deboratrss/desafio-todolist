package br.com.deborathamires.Todolist.controller;

import br.com.deborathamires.Todolist.entity.Todo;
import br.com.deborathamires.Todolist.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {
    private TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    List<Todo> create(@RequestBody Todo todo){
        return todoService.create(todo);
    }

    @GetMapping
    List<Todo> list(){
        return todoService.list();
    }

    @GetMapping("{id}")
    Todo listId(@PathVariable("id") Long id){
        return todoService.listId(id);
    }

    @PutMapping("{id}")
    Todo updated(@PathVariable("id") Long id, @RequestBody Todo todo){
        return todoService.update(id, todo);
    }

    @DeleteMapping("{id}")
    List<Todo> delete(@PathVariable("id") Long id){
        return todoService.delete(id);
    }
}
