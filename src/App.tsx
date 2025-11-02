import './App.css'
import TodolistItem from "./TodolistItem.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
// import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {containerSx} from "./ToDoListItem.styles.ts";
import Box from '@mui/material/Box'
import {NavButton} from "./NavBtn.ts";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC, deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";

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
    // const toDoListId_1 = v1();
    // const toDoListId_2 = v1();

    // const [toDoLists, setToDoLists] = useState<ToDoListType[]>([
    //     {todolistId: toDoListId_1, title: "What to learn", filter: "all"},
    //     {todolistId: toDoListId_2, title: "What to do", filter: "all"}
    // ]);

    const [toDoLists, dispatchToTodolists] = useReducer(todolistsReducer, [])

    const [tasks, setTask] = useState<TasksStateType>({
        // [toDoListId_1]: [
        //     {id: v1(), title: "HTML&CSS", isDone: true},
        //     {id: v1(), title: "JS", isDone: true},
        //     {id: v1(), title: "RactJS", isDone: false},
        //     {id: v1(), title: "Redux", isDone: true},],
        // [toDoListId_2]: [
        //     {id: v1(), title: "Bread", isDone: true},
        //     {id: v1(), title: "Meat", isDone: true},
        //     {id: v1(), title: "Sausages", isDone: false},
        //     {id: v1(), title: "Beer", isDone: true},
        // ],
    })


    //Logic
    //To do lists CRUD
    const createToDoList = (title:ToDoListType['title'])=>{
        //1.Иммутабельно создаем новое состояние
       // const newToDoListId = v1();
       //  const newToDoList: ToDoListType ={
       //      todolistId:newToDoListId,
       //      title:title,
       //      filter:"all"
       //  }
       //  const nextState:ToDoListType[] = [...toDoLists, newToDoList];
       //  setToDoLists(nextState)
       //  setTask({...tasks, [newToDoListId]:[]});

        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        setTask({...tasks, [action.payload.id]:[]})
    }
    const changeTodolistFilter = (newFilterValue: FilterValuesType, toDoListId: ToDoListType['todolistId']) => {
        // //1.Иммутабельно создаем новое состояние
        // const nextState: ToDoListType[] = toDoLists.map(tl => tl.todolistId === toDoListId ? {...tl, filter: newFilterValue} : tl);
        // //2.Передаем новое состояние которое реакт сравнивает для обновления его визуализации
        // setToDoLists(nextState)

        dispatchToTodolists(changeTodolistFilterAC({id:toDoListId, filter:newFilterValue}))
    }
    const delateToDoList = (toDoListId: ToDoListType['todolistId']) => {
        // //1.Иммутабельно создаем новое состояние
        // const nextState: ToDoListType[] = toDoLists.filter(tl => tl.todolistId !== toDoListId);
        // //2.Передаем новое состояние которое реакт сравнивает для обновления его визуализации
        // setToDoLists(nextState)
        // const copyTasksState = {...tasks};
        // delete copyTasksState[toDoListId];
        // setTask(copyTasksState);
        dispatchToTodolists(deleteTodolistAC(toDoListId))
    }
    const changeToDoListTitle = (newToDoListTitle: ToDoListType['title'], toDoListId: ToDoListType['todolistId']) =>{
                // //1.Иммутабельно создаем новое состояние
                // const nextState: ToDoListType[] = toDoLists.map(tl => tl.todolistId === toDoListId ? {...tl, title: newToDoListTitle} : tl);
                // //2.Передаем новое состояние которое реакт сравнивает для обновления его визуализации
                // setToDoLists(nextState)

        dispatchToTodolists(changeTodolistTitleAC({id:toDoListId, title:newToDoListTitle}))
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
            <Grid key={tl.todolistId}>
                <Paper elevation={3} sx={{padding: '10px'}}>
                    <TodolistItem
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
                </Paper>
            </Grid>
        )
    })

    const [isDarkmode, setDarkMode] =useState(false);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#b3e5fc',
            },
            secondary: {
                main: '#80d8ff',
            },
            mode: isDarkmode ? 'dark' : 'light'
        }
    })

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Box>
                        <Switch onChange={()=>setDarkMode(!isDarkmode)}></Switch>
                        <NavButton color="primary">Sign in</NavButton>
                        <NavButton color="inherit">Sign out</NavButton>
                        <NavButton color="inherit" background={theme.palette.primary.light}>FAQ</NavButton>
                        <NavButton color="inherit">Home</NavButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Grid container sx={{paddingTop: '10px'}}>
                    <CreateItemForm createItem={createToDoList} maxTitleLength={10} minTitleLength={3} />
                </Grid>
                <Grid container spacing={1}>
                    {toDoListsComponents}
                </Grid>
            </Container>
            </ThemeProvider>
        </div>
    )
}


