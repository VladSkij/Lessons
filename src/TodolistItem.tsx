import {FilterValuesType, TaskType, ToDoListType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    todolistId: string
    changeTaskTitle: (taskId: TaskType["id"], newTaskTitle: TaskType["title"], toDoListId: ToDoListType['todolistId'])=> void
    changeToDoListTitle:(newToDoListTitle: ToDoListType['title'], toDoListId: ToDoListType['todolistId'])=>void
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

    const changeToDoListTitleHandler = (newTitle:string)=>{
        changeToDoListTitle(newTitle, todolistId)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeToDoListTitleHandler}/>
                <Button title={'X'} onClickFunction={() => delateToDoList(todolistId)}/>
            </h3>
            <CreateItemForm createItem={createTaskHandler} maxTitleLength={10} minTitleLength={3}/>
            {tasks.length === 0 ? (<p>No tasks</p>) : (
                <ul>
                    {
                        tasks.map((t: TaskType) => {
                            const updateTaskHandler = (e: ChangeEvent<HTMLInputElement>) => updateTask(t.id, e.currentTarget.checked, todolistId)
                            const changeTaskTitleHandler = (newTitle:string)=> changeTaskTitle(t.id, newTitle, todolistId)
                            return (
                                <li className={t.isDone ? "task-done" : "task-active"}>
                                    <input
                                        type="checkbox"
                                        checked={t.isDone}
                                        onChange={updateTaskHandler}
                                    />
                                    <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler}/>
                                    <Button title="X" onClickFunction={() => deleteTask(t.id, todolistId)}/>
                                </li>
                            )
                        })}

                </ul>
            )}
            <div>
                <Button
                    className={filter === "all" ? "btn-filter-active" : ''}
                    title="All"
                    onClickFunction={() => changeTodolistFilter("all", todolistId)}/>
                <Button
                    className={filter === "active" ? "btn-filter-active" : ''}
                    title="Active"
                    onClickFunction={() => changeTodolistFilter("active", todolistId)}/>
                <Button
                    className={filter === "completed" ? "btn-filter-active" : ''}
                    title="Completed"
                    onClickFunction={() => changeTodolistFilter("completed", todolistId)}/>
            </div>
        </div>
    )
}
export default TodolistItem