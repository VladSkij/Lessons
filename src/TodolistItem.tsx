import {FilterValuesType, TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType["id"]) => void
    changeTodolistFilter: (newFilterValue:FilterValuesType) => void
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeTodolistFilter
                             }: TodolistPropsType) => {
    console.log(tasks[3])
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title="+"/>
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