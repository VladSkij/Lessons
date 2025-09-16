import './App.css'
     import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"
export const App=()=> {

    //BLL:
    const todolistTitle: string = "What to learn ";
    //State:
    const [tasks, setTask] = useState<TaskType[]>( // Определяем данные при изменении которых - требуется обновление интерфейса -> (отрисовка)//будет лежать уже nextState
        [
            {id:1, title:"HTML&CSS", isDone:true},
            {id:2, title:"JS", isDone:true},
            {id:3, title:"RactJS", isDone:false},
            {id:4, title:"Redux", isDone:true},
        ]
    );


    //Logic
    const deleteTask = (taskId: TaskType["id"]) =>{
        //1.Иммутабельно создаем новое стстояние
        const nextState: TaskType[] = tasks.filter(t=>t.id !== taskId);
        //2.Передаем новое состояние которое реакт сравнивает для обновления его визуализации
        setTask(nextState);
        console.log(tasks);
    }
    // const todolistTitle_1: string = "Songs";
    // const task2: TaskType[] =[
    //     //
    // ]
    // const todolistTitle_2: string = "Books";
    // const task3: TaskType[] =[
    //     {id:1, title:"Harry Potter", isDone:false},
    //     {id:2, title:"The Little Prince", isDone:false},
    //     {id:3, title:"The Hobbit", isDone:false},
    //     {id:4, title:"Dune", isDone:true},
    //     {id:5, title:"Jack", isDone:false}
    // ]

    //UI:
    const [filter, setFilter] = useState<FilterValuesType>("all");
    const changeTodolistFilter = (newFilterValue:FilterValuesType) =>{
        setFilter(newFilterValue)
    }
    const getFiltredTasksForRender=()=>{
        let tascsForRender = tasks
        if (filter === "active"){
            tascsForRender = tasks.filter(t => !t.isDone);
        }
        if (filter === "completed"){
            tascsForRender = tasks.filter(t => t.isDone);
        }
        return tascsForRender;
    }

  return (
      <div className="app">
            <TodolistItem
                title={todolistTitle}
                tasks = {getFiltredTasksForRender()}
                deleteTask={deleteTask}
                changeTodolistFilter={changeTodolistFilter}/>
            {/*<TodolistItem title={todolistTitle_1} tasks = {task2}/>*/}
            {/*<TodolistItem title={todolistTitle_2} tasks = {task3}/>*/}
      </div>
  )
}


