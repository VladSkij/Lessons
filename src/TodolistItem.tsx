import {FilterValuesType, TaskType, ToDoListType} from "./App.tsx";
// import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {containerSx, getListItemSx} from "./ToDoListItem.styles.ts";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    todolistId: string
    changeTaskTitle: (taskId: TaskType["id"], newTaskTitle: TaskType["title"], toDoListId: ToDoListType['todolistId']) => void
    changeToDoListTitle: (newToDoListTitle: ToDoListType['title'], toDoListId: ToDoListType['todolistId']) => void
    createTask: (title: TaskType["title"], toDoListId: ToDoListType['todolistId']) => void
    deleteTask: (taskId: TaskType["id"], toDoListId: ToDoListType['todolistId']) => void
    changeTodolistFilter: (newFilterValue: FilterValuesType, toDoListId: ToDoListType['todolistId']) => void
    updateTask: (taskId: TaskType["id"], newTaskStatus: TaskType["isDone"], toDoListId: ToDoListType['todolistId']) => void
    delateToDoList: (toDoListId: ToDoListType['todolistId']) => void
}

const TodolistItem = ({
                          //(props: PropsType) => {
                          //const { title, tasks, deleteTask, changeTodolistFilter } = props;
                          title,
                          tasks,
                          filter,
                          todolistId,
                          changeTaskTitle,
                          createTask,
                          deleteTask,
                          updateTask,
                          changeTodolistFilter,
                          delateToDoList,
                          changeToDoListTitle
                      }: TodolistPropsType) => {

    const createTaskHandler = (taskTitle: TaskType['title']) => {
        createTask(taskTitle, todolistId);
    }

    const changeToDoListTitleHandler = (newTitle: string) => {
        changeToDoListTitle(newTitle, todolistId)
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <h3>
                <EditableSpan title={title} changeTitle={changeToDoListTitleHandler}/>
                <IconButton
                    onClick={() => delateToDoList(todolistId)}
                    size={'small'}>
                    <DeleteIcon fontSize={'small'}/>
                </IconButton>
            </h3>
            <CreateItemForm createItem={createTaskHandler} maxTitleLength={10} minTitleLength={3}/>
            {tasks.length === 0 ? (<p>No tasks</p>) : (
                <List>
                    {
                        tasks.map((t: TaskType) => {
                            const updateTaskHandler = (e: ChangeEvent<HTMLInputElement>) => updateTask(t.id, e.currentTarget.checked, todolistId)
                            const changeTaskTitleHandler = (newTitle: string) => changeTaskTitle(t.id, newTitle, todolistId)
                            return (
                                <ListItem sx={containerSx} disablePadding>
                                    <Box sx={getListItemSx(t.isDone)}>
                                        <Checkbox
                                            size={'small'}
                                            checked={t.isDone}
                                            onChange={updateTaskHandler}>
                                        </Checkbox>
                                        <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler}/>
                                    </Box>
                                    <IconButton
                                        onClick={() => deleteTask(t.id, todolistId)}
                                        size={'small'}>
                                        <HighlightOffIcon fontSize={'small'}/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}

                </List>
            )}
            <Box sx={containerSx}>
                <Button
                    onClick={() => changeTodolistFilter("all", todolistId)}
                    variant={'contained'}
                    size="small"
                    color={filter === "all" ? "secondary" : 'primary'}
                >
                    All
                </Button>
                <Button
                    onClick={() => changeTodolistFilter("active", todolistId)}
                    variant={'contained'}
                    size="small"
                    color={filter === "active" ? "secondary" : 'primary'}
                >
                    Active
                </Button>
                <Button
                    onClick={() => changeTodolistFilter("completed", todolistId)}
                    variant={'contained'}
                    size="small"
                    color={filter === "completed" ? "secondary" : 'primary'}
                >
                    Completed
                </Button>
            </Box>
        </Box>
    )
}
export default TodolistItem