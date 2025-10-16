import './App.css'
import TodolistItem from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";

export type ToDoListType = {
    todolistId: string;
    title: string;
    filter: FilterValuesType;
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterValuesType = "all" | "active" | "completed"

export type TasksStateType = {
    [toDoListId: string]: TaskType[]
}

export const App = () => {
    //BLL:

    // State:
    const toDoListId_1 = v1();
    const toDoListId_2 = v1();

    const [toDoLists, setToDoLists] = useState<ToDoListType[]>([
        {todolistId: toDoListId_1, title: "What to learn", filter: "all"},
        {todolistId: toDoListId_2, title: "What to do", filter: "all"}
    ]);

    const [tasks, setTask] = useState<TasksStateType>({
        [toDoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "RactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: true},],
        [toDoListId_2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Sausages", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
        ],
    })


    //Logic
    //To do lists CRUD
    const createToDoList = (title:ToDoListType['title'])=>{
        //1.Иммутабельно создаем новое состояние
       const newToDoListId = v1();
        const newToDoList: ToDoListType ={
            todolistId:newToDoListId,
            title:title,
            filter:"all"
        }
        const nextState:ToDoListType[] = [...toDoLists, newToDoList];
        setToDoLists(nextState)
        setTask({...tasks, [newToDoListId]:[]});
    }
    const changeTodolistFilter = (newFilterValue: FilterValuesType, toDoListId: ToDoListType['todolistId']) => {
        //1.Иммутабельно создаем новое состояние
        const nextState: ToDoListType[] = toDoLists.map(tl => tl.todolistId === toDoListId ? {...tl, filter: newFilterValue} : tl);
        //2.Передаем новое состояние которое реакт сравнивает для обновления его визуализации
        setToDoLists(nextState)
    }
    const delateToDoList = (toDoListId: ToDoListType['todolistId']) => {
        //1.Иммутабельно создаем новое состояние
        const nextState: ToDoListType[] = toDoLists.filter(tl => tl.todolistId !== toDoListId);
        //2.Передаем новое состояние которое реакт сравнивает для обновления его визуализации
        setToDoLists(nextState)
        const copyTasksState = {...tasks};
        delete copyTasksState[toDoListId];
        setTask(copyTasksState);
    }
    const changeToDoListTitle = (newToDoListTitle: ToDoListType['title'], toDoListId: ToDoListType['todolistId']) =>{
        //1.Иммутабельно создаем новое состояние
        const nextState: ToDoListType[] = toDoLists.map(tl => tl.todolistId === toDoListId ? {...tl, title: newToDoListTitle} : tl);
        //2.Передаем новое состояние которое реакт сравнивает для обновления его визуализации
        setToDoLists(nextState)
    }

    //Tasks CRUD
    const deleteTask = (taskId: TaskType["id"], toDoListId: ToDoListType['todolistId']) => {
        //1.Иммутабельно создаем новое состояние
        // const taskToDelate = (tasks[toDoListId])
        // const newTask = taskToDelate.filter(t => t.id !== taskId)
        // const nextState = (...tasks)
        // nextState[toDoListId] = newTask

        const nextState = {
            ...tasks,
            [toDoListId]: tasks[toDoListId].filter(t => t.id !== taskId)
        }

        //2.Передаем новое состояние которое реакт сравнивает для обновления его визуализации
        setTask(nextState);
    }
    const createTask = (title: TaskType["title"], toDoListId: ToDoListType['todolistId']) => {
        //1.Иммутабельно создаем новое состояние
        //create new task
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextState: TasksStateType = {
            ...tasks,
            [toDoListId]: [...tasks[toDoListId], newTask]
        }
        //2.Передаем новое состояние которое реакт сравнивает для обновления его визуализации
        setTask(nextState);
    }
    const updateTask = (taskId: TaskType["id"], newTaskStatus: TaskType["isDone"], toDoListId: ToDoListType['todolistId']) => {
        //1.Иммутабельно создаем новое состояние
        const nextState: TasksStateType = {
            ...tasks,
            [toDoListId]: tasks[toDoListId].map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
        }
        //2.Передаем новое состояние которое реакт сравнивает для обновления его визуализации
        setTask(nextState);
    }
    const changeTaskTitle = (taskId: TaskType["id"], newTaskTitle: TaskType["title"], toDoListId: ToDoListType['todolistId'])=>{
        //1.Иммутабельно создаем новое состояние
        const nextState: TasksStateType = {
            ...tasks,
            [toDoListId]: tasks[toDoListId].map(t => t.id === taskId ? {...t, title: newTaskTitle} : t)
        }
        //2.Передаем новое состояние которое реакт сравнивает для обновления его визуализации
        setTask(nextState);
    }

    //UI
    const getFiltredTasksForRender = (tasks: TaskType[], filter: FilterValuesType) => {
        let tasksForRender = tasks
        if (filter === "active") {
            tasksForRender = tasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            tasksForRender = tasks.filter(t => t.isDone);
        }
        return tasksForRender;
    }

    const toDoListsComponents = toDoLists.map(tl => {
        return (
            <TodolistItem
                key={tl.todolistId}
                todolistId={tl.todolistId}
                title={tl.title}
                tasks={getFiltredTasksForRender(tasks[tl.todolistId], tl.filter)}
                filter={tl.filter}
                changeTaskTitle={changeTaskTitle}

                changeToDoListTitle = {changeToDoListTitle}
                createTask={createTask}
                deleteTask={deleteTask}
                changeTodolistFilter={changeTodolistFilter}
                updateTask={updateTask}
                delateToDoList={delateToDoList}
            />
        )
    })

    return (
        <div className="app">
            <CreateItemForm createItem={createToDoList} maxTitleLength={10} minTitleLength={15} />
            {toDoListsComponents}
        </div>
    )
}


