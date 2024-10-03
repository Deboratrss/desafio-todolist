import { useState } from 'react';
import './index.css';
import { useDraggable } from '@dnd-kit/core';
import Modal from 'react-modal';
import { api } from '../api';

export function Task({getTasks, toDo, isNew, salveTask}){

    const [modalIsOpen,setIsOpen] = useState(false)
    function openModal(){
        setIsOpen(true)
    }
    function closeModal(){
        setIsOpen(false)
    }
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: toDo.id,
        data: toDo
    })

    const style =  transform ? {
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
    } : undefined;

    const submit = (event) => {
        event.preventDefault()
        console.log(event)
        salveTask({titulo: event.currentTarget.elements.name.value, 
            descricao: event.currentTarget.elements.descricao.value,
            data: new Date().toISOString()})
    }

    function deleteTask(){
        api.delete(`/todos/${toDo.id}`).then(getTasks)          
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    }

    if(isNew) return(
        <div className="tarefas">
            <form className='formTarefas' onSubmit={submit}>
                <input type="text" name="name" placeholder='Digite o titulo'></input>
                <input type="text" name="prioridade" placeholder='Qual o nivel de prioridade dessa tarefa'></input>
                <textarea name="descricao" placeholder='Descrição da tarefa'></textarea>
                <button type='submit'>Salvar</button>
            </form>
    </div>
    )

    return(
        <div className="tarefas">
           <div className='info' ref={setNodeRef} style={style} {...listeners} {...attributes} >
                <h4>{toDo.titulo}</h4>
                <p><b>Criado em: </b>{toDo.data}</p>
           </div> 
           <div className='ButtosTask'>
                <button className='Visualizar' onClick={openModal}>Visualizar Task</button>
                <button className='Excluir' onClick={deleteTask}>Excuir Task</button>
           </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Task'>
                <h3>{toDo.titulo}</h3>
                <p><b>Descrição: </b>{toDo.descricao}</p>
                <p><b>Status: </b>{toDo.status}</p>
                <p><b>Prioridade: </b>{toDo.prioridade}</p>
                <p><b>Criado em: </b>{toDo.data}</p>
                <button onClick={closeModal}> Fechar</button>
            </Modal>
        </div>
    )
}