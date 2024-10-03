import { Button } from '../button';
import { Task } from '../task';
import './index.css';
import { useDroppable } from '@dnd-kit/core';

export function Cards({getTasks, titulo, color, list, addNew, salveTask}){
    const {isOver, setNodeRef} = useDroppable({
        id: titulo,
    });
    const style = {
        color: isOver ? 'rgb(108, 155, 125)' : undefined,
        backgroundColor: color,
    }
    return(
    <div className='Templatecard' ref={setNodeRef} style={style}>
        <h2>{titulo}</h2>
        {list.map(toDo => (
            <Task getTasks={getTasks} key={toDo.id} toDo={toDo} isNew={toDo.isNew} salveTask={salveTask}/>
        ))}
        {
            addNew ? (<Button onClick={addNew}/>) : null
        }
    </div>
    )
}