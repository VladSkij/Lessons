import {TaskType} from "./App.tsx";
import {Button} from "./Button.tsx";

type TodolistPropsType ={
    title: string
    tasks: TaskType[]
    date?: string
}

export const TodolistItem =({title, tasks, date}: TodolistPropsType)=>{
    console.log (tasks[3])
    return(
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title="+"/>
            </div>
            {tasks.length === 0?(<p>No tasks</p>):(
                <ul>
                    {tasks.map(task=>{
                        return (
                            <li>
                                <input type="checkbox" checked={task.isDone}></input>
                                <span>{task.title}</span>
                            </li>
                        )
                    })}
                    {/*<li>*/}
                    {/*    <input type="checkbox" checked={tasks[0].isDone}/>*/}
                    {/*    <span>{tasks[0].title}</span>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <input type="checkbox" checked={true}/>*/}
                    {/*    <span>{tasks[1].title}</span>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <input type="checkbox" checked={false}/>*/}
                    {/*    <span>{tasks[2].title}</span>*/}
                    {/*</li>*/}
                </ul>
            )}
            <div>
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Completed"/>
            </div>
            <div>{date}</div>
        </div>
    )
}