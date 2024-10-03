package br.com.deborathamires.Todolist.service;

import br.com.deborathamires.Todolist.entity.Todo;
import br.com.deborathamires.Todolist.repository.TodoRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
 private TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> create(Todo todo){
        todoRepository.save(todo);
        return list();
    }
    public Todo listId(Long id){
        return todoRepository.findById(id).get();
    }

    public List<Todo> list(){
        Sort sort = Sort.by("prioridade").descending().and(
                Sort.by("titulo").ascending());
        return todoRepository.findAll(sort);
    }

    public Todo update(Long id, Todo todo){
        Todo t = todoRepository.findById(id).get();
        t.setTitulo(todo.getTitulo());
        t.setDescricao(todo.getDescricao());
        t.setData(todo.getData());
        t.setStatus(todo.getStatus());
        t.setPrioridade(todo.getPrioridade());
        todoRepository.save(t);
        return t;
    }
    public List<Todo> delete(Long id){
        todoRepository.deleteById(id);
        return list();
    }

}
