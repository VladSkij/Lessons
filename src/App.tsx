import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const App=()=> {

    //Date:
    const todolistTitle: string = "What to learn ";
    const task1: TaskType[] =[
        {id:1, title:"HTML&CSS", isDone:true},
        {id:2, title:"JS", isDone:true},
        {id:3, title:"RactJS", isDone:false},
        {id:4, title:"Redux", isDone:true},
    ]

    const todolistTitle_1: string = "Songs";
    const task2: TaskType[] =[
        //
    ]
    const todolistTitle_2: string = "Books";
    const task3: TaskType[] =[
        {id:1, title:"Harry Potter", isDone:false},
        {id:2, title:"The Little Prince", isDone:false},
        {id:3, title:"The Hobbit", isDone:false},
        {id:4, title:"Dune", isDone:true},
        {id:5, title:"Jack", isDone:false}
    ]

    //UI:
  return (
      <div className="app">
            <TodolistItem title={todolistTitle} tasks = {task1} date="01.10.2025"/>
            <TodolistItem title={todolistTitle_1} tasks = {task2}/>
            <TodolistItem title={todolistTitle_2} tasks = {task3}/>
      </div>
  )
}


