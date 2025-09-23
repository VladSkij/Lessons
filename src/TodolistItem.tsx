import {FilterValuesType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {useState } from "react";
import {KeyboardEvent} from "react";
// import {useRef} from "react";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    createTask : (title:TaskType["title"]) =>void
    deleteTask: (taskId: TaskType["id"]) => void
    changeTodolistFilter: (newFilterValue:FilterValuesType) => void
}

export const TodolistItem = ({
                                    //(props: PropsType) => {
                                    //const { title, tasks, deleteTask, changeTodolistFilter } = props;
                                 title,
                                 tasks,
                                 createTask,
                                 deleteTask,
                                 changeTodolistFilter
                             }: TodolistPropsType) => {

    // const taskTitleRef = useRef<HTMLInputElement>(null);
    const [taskTitle, setTaskTitle] = useState("");

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
        createTask(taskTitle);
        setTaskTitle("");
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    autoFocus={true}
                    value={taskTitle}
                    onChange={(e)=>setTaskTitle(e.currentTarget.value)}
                    onKeyDown={onKeyDownCreateTaskHandler}
                />
                <Button title="+"
                        onClickFunction={createTaskHandler}
                        disabled={taskTitle.length < 3 || taskTitle.length>10}/>
                {taskTitle.length < 3 &&<div>title must be more then 3 chartes</div>}
                {taskTitle.length >= 3 && taskTitle.length <10 &&<div>title must be less then 10 chartes</div>}
            </div>
            {tasks.length === 0 ? (<p>No tasks</p>) : (
                <ul>
                    {
                        tasks.map((t: TaskType) => {
                            return (
                                <li>
                                    <input type="checkbox" checked={t.isDone}></input>
                                    <span>{t.title}</span>
                                    <Button title="X" onClickFunction={() => deleteTask(t.id)}/>
                                </li>
                            )
                        })}

                </ul>
            )}
            <div>
                <Button title="All" onClickFunction={()=>changeTodolistFilter("all")}/>
                <Button title="Active" onClickFunction={()=>changeTodolistFilter("active")}/>
                <Button title="Completed" onClickFunction={()=>changeTodolistFilter("completed")}/>
            </div>
        </div>
    )
}