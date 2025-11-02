import {TasksStateType, TaskType} from '../App'
import {v1} from "uuid";


export const CreateTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: {id: v1(), title}} as const
}

export const DeleteTodolistAC = (toDoListId: string) => {
    return {type: 'delete_todolist', payload: {id: toDoListId}} as const
}

export const DeleteTaskAC = (p:{taskId: string, toDoListId: string}) => {
    return {type: 'delete_task', payload: p} as const
}

export const CreateTaskAC =(p:{title:string, toDoListId: string})=>{
    return {type: 'create_task', payload: p} as const
}

export const ChangeTaskStatusAC = (p:{taskId: string, newTaskStatus:boolean, toDoListId: string}) => {
    return{type: 'change_task_status' , payload: p} as const
}

export const  ChangeTaskTitleAC = (p:{toDoListId:string, taskId:string, newTitle:string})=>{
    return {type: 'change_task_title', payload: p} as const
}

export type CreateTodolistAction = ReturnType<typeof CreateTodolistAC>
export type DeleteTodolistAction = ReturnType<typeof DeleteTodolistAC>
export type DeleteTaskAction = ReturnType<typeof DeleteTaskAC>
export type CreateTaskAction = ReturnType<typeof CreateTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof ChangeTaskStatusAC>
export type ChangeTaskTitleAction = ReturnType<typeof ChangeTaskTitleAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: Actions): TasksStateType => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist': {
            const copyTasksState = {...state};
            delete copyTasksState[action.payload.id];
            return copyTasksState
        }
        case 'delete_task': {
            return {...state, [action.payload.toDoListId]: state[action.payload.toDoListId].filter(t => t.id !== action.payload.taskId) }
        }
        case "create_task": {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return {
                ...state,
            [action.payload.toDoListId]:[...state[action.payload.toDoListId],newTask]
            }
        }
        case "change_task_status": {
            return {...state, [action.payload.toDoListId]: state[action.payload.toDoListId].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.newTaskStatus} : t)}
        }
        case "change_task_title":{
            return {...state, [action.payload.toDoListId]: state[action.payload.toDoListId].map(t=> t.id === action.payload.taskId? {...t, title:action.payload.newTitle} : t)}
        }

        default:
            return state
    }
}

