import {FilterValuesType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, useState} from "react";
import {KeyboardEvent} from "react";
// import {useRef} from "react";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    createTask : (title:TaskType["title"]) =>void
    deleteTask: (taskId: TaskType["id"]) => void
    changeTodolistFilter: (newFilterValue:FilterValuesType) => void
    updateTask :(taskId: TaskType["id"], newTaskStatus: TaskType["isDone"])=>void
}

export const TodolistItem = ({
                                    //(props: PropsType) => {
                                    //const { title, tasks, deleteTask, changeTodolistFilter } = props;
                                 title,
                                 tasks,
                                 filter,
                                 createTask,
                                 deleteTask,
                                 updateTask,
                                 changeTodolistFilter
                             }: TodolistPropsType) => {

    // const taskTitleRef = useRef<HTMLInputElement>(null);
    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState(false);

    const onKeyDownCreateTaskHandler = (e:KeyboardEvent<HTMLInputElement>)=>{
            if (e.key === "Enter" && taskTitle.length >= 3 && taskTitle.length <10) {
                createTaskHandler()
            }
        }

    const createTaskHandler = () => {
        // if(taskTitleRef.current){
        //     createTask(taskTitleRef.current.value)
        //     taskTitleRef.current.value =""
        // }
        const trimmedTaskTitle = taskTitle.trim();
        if(trimmedTaskTitle){
            createTask(taskTitle);
        }else{
            setError(true);
        }

        setTaskTitle("");
    }

    const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        error && setError(false);
        setTaskTitle(e.currentTarget.value)}

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    autoFocus={true}
                    value={taskTitle}
                    onChange={changeTaskHandler}
                    onKeyDown={onKeyDownCreateTaskHandler}
                    className={error? "error" : ""}
                />
                <Button title="+"
                        onClickFunction={createTaskHandler}
                        disabled={taskTitle.length < 3 || taskTitle.length>10}
                />
                {!error && taskTitle.length < 3 &&<div>title must be more then 3 chartes</div>}
                {!error && taskTitle.length >= 3 && taskTitle.length <10 &&<div>title must be less then 10 chartes</div>}
                {taskTitle.length >= 10  &&<div style={{color:"red"}}>Max title length is 10 chartes</div>}
                {error && <div style={{color:"red"}}>Title is requared</div>}
            </div>
            {tasks.length === 0 ? (<p>No tasks</p>) : (
                <ul>
                    {
                        tasks.map((t: TaskType) => {
                            const updateTaskHandler = (e :ChangeEvent<HTMLInputElement>)=>updateTask(t.id, e.currentTarget.checked)
                            return (
                                <li className={t.isDone ? "task-done" : "task-active"}>
                                    <input
                                        type="checkbox"
                                        checked={t.isDone}
                                        onChange={updateTaskHandler}
                                    />
                                    <span>{t.title}</span>
                                    <Button title="X" onClickFunction={() => deleteTask(t.id)}/>
                                </li>
                            )
                        })}

                </ul>
            )}
            <div>
                <Button
                    className={filter === "all" ? "btn-filter-active":''}
                    title="All"
                    onClickFunction={()=>changeTodolistFilter("all")}/>
                <Button
                    className={filter === "active" ? "btn-filter-active":''}
                    title="Active"
                    onClickFunction={()=>changeTodolistFilter("active")}/>
                <Button
                    className={filter === "completed" ? "btn-filter-active":''}
                    title="Completed"
                    onClickFunction={()=>changeTodolistFilter("completed")}/>
            </div>
        </div>
    )
}