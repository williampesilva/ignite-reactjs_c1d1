import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if(!newTaskTitle) return; // Não permite que seja retornado nada caso a nova task não tenha um título.

    const newTask = {       // Aqui estou criando um estado temporário, seguinto o padrão da task.
      id: Math.random(),    // Gerando um id aleatório.
      title: newTaskTitle,  // Capturando o título digitado no campo.
      isComplete: false,    // Deixando por padrão a taks como incompleta.
    }

    setTasks(oldState => [...oldState, newTask]); // Neste momento, estamos inserindo a newTask dentro setTasks, mantendo tudo que ja estava dentro dele anteriormente [...oldState, newTask]
    setNewTaskTitle(''); // Aqui estou resetando o valor do input para ficar limpo após submeter uma task.
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const newTaskList = tasks.map(task => task.id === id ? {  // Mapeamos a lista de tasks, e quando for encontrado a task selecionada,
      ...task,                                                // passamos toda a informação ja existente no objeto e,
      isComplete: !task.isComplete                            // Alteramos o estado do isComplete para true ou false.
    } : task);                                                // Caso não seja a task selecionada, somente devolvemos para a nova lista.

    setTasks(newTaskList) // Retorna a nova lista a ser exibida com a task que marcamos no checkbox.

    // const selectedTask = tasks.filter(task => task.id === id);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const listWithoutDeletedTask = tasks.filter(task => task.id !== id); // Cria uma lista excluindo a task que será deletada.

    setTasks(listWithoutDeletedTask); // Retorna a nova lista a ser exibida sem a task deletada.
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}