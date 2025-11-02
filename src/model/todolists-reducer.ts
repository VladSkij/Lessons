import {ToDoListType} from "../App.tsx";
import {v1} from "uuid";
import {FilterValuesType } from '../App.tsx';

const initialState: ToDoListType[]=[]
// type Actions = {
//     type: string;
//     payload:any
// }

export const deleteTodolistAC = (id:string)=>{
    return {type:'delete_todolist',payload:{id}} as const
}

export const createTodolistAC = (title:string)=>{
    return{type:'create_todolist', payload:{id:v1(), title}} as const
}

export const changeTodolistTitleAC = (p:{id:string, title:string})=>{
    return {type:'change_todolist_title', payload:p  } as const
}

export const changeTodolistFilterAC = (p:{id:string, filter: FilterValuesType})=>{
    return {type:'change_todolist_filter', payload:p } as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistAction | ChangeTodolistFilterAction



export const todolistsReducer = (state:ToDoListType[] = initialState, action:Actions): ToDoListType[]=>{
    switch(action.type){
        case 'delete_todolist':{
            return state.filter(tl => tl.todolistId !== action.payload.id)// todolist logic
        }
        case 'create_todolist':{
            const newToDoList: ToDoListType ={
                todolistId:action.payload.id,
                title:action.payload.title,
                filter:"all"
            }
            return [...state, newToDoList]
        }
        case 'change_todolist_title':{
            return state.map(tl => tl.todolistId === action.payload.id ? {...tl, title: action.payload.title} : tl);
        }
        case 'change_todolist_filter':{
            return state.map(tl => tl.todolistId === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state
    }
}


