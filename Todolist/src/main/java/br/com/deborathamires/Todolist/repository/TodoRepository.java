package br.com.deborathamires.Todolist.repository;

import br.com.deborathamires.Todolist.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
