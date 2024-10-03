import './App.css';
import { Cards } from './cards';
import {useEffect, useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import { api } from './api';

function App() {
  const [list1, setList1] = useState([])
  const [list2, setList2] = useState([])
  const [list3, setList3] = useState([])

  const addNew = () => {
    setList1([...list1, {isNew: true, titulo:"", data:""}])
  }

  const addNew2 = () => {
    setList2([...list2, {isNew: true, titulo:"", data:""}])
  }

  const getTasks=()=>{
    api.get("/todos").then((response)=>{
      console.log(response)
      setList1(response.data.filter((task)=>{
        return task.status === "Não iniciado"
      }))
      setList2(response.data.filter((task)=>{
        return task.status === "Em andamento"
      }))
      setList3(response.data.filter((task)=>{
        return task.status === "Concluido"
      }))
    }).catch(error => console.error(error))
  }
  const salveTask = (task) => {
    console.log(task)
    api.post("/todos", {
      ...task,
      prioridade: 1,
      status:"Não iniciado",
      data: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
    }).then(getTasks)
  }

  const salveTask2 = (task) => {
    console.log(task)
    api.post("/todos", {
      ...task,
      prioridade: 1,
      status:"Em andamento",
      data: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
    }).then(getTasks)
  }

  const handleDragEnd = (event) => {
    console.log(event)
    if(event.over) {
      switch(event.over.id){
        case "Não iniciado":
          api.put(`/todos/${event.active.data.current.id}`,{
            ...event.active.data.current,
            status:"Não iniciado"
          }).then(getTasks)
          break
        case "Em andamento":
          api.put(`/todos/${event.active.data.current.id}`,{
            ...event.active.data.current,
            status:"Em andamento"
          }).then(getTasks)        
          break
        case "Concluido":
          api.put(`/todos/${event.active.data.current.id}`,{
            ...event.active.data.current,
            status:"Concluido"
          }).then(getTasks)
          break
        default : console.log('nao encontrado')
      }
    }
  }

  useEffect(()=>{
    api.get("/todos").then((response)=>{
      console.log(response)
      setList1(response.data.filter((task)=>{
        return task.status === "Não iniciado"
      }))
      setList2(response.data.filter((task)=>{
        return task.status === "Em andamento"
      }))
      setList3(response.data.filter((task)=>{
        return task.status === "Concluido"
      }))
    }).catch(error => console.error(error))
  }, [])
 
  return (
    <DndContext  onDragEnd={handleDragEnd}>
      <div className="App">
        <h1>TASK LIST</h1>
        <p>Clique em + Novo para criar uma nova tarefa diretamente neste quadro. 
        Mova os cartões de tarefas para a próxima seção à medida que você os completa!</p>
        <div className="Cardlist">
          <Cards getTasks={getTasks} color="rgba(253, 245, 243, 0.7)" titulo="Não iniciado" list={list1} addNew={addNew} salveTask={salveTask}/>
          <Cards getTasks={getTasks} color="rgba(241, 248, 251, 0.7)" titulo="Em andamento" list={list2} addNew={addNew2} salveTask={salveTask2}/>
          <Cards getTasks={getTasks} color="rgba(244, 248, 243, 0.7)" titulo="Concluido" list={list3} />
        </div>
      </div>
    </DndContext>
  );
}

export default App;
