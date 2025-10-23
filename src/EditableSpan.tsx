import {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type PropsType = {
    title: string,
    changeTitle: (NewTitle: string) => void,
}

export const EditableSpan = ({title, changeTitle}:PropsType) => {
    const [editMode, setEditMode] =useState(false)
    const [itemTitle, setItemTitle] = useState(title);

    const onEditMode = ()=>setEditMode(true)
    const offEditMode = ()=>{
        changeTitle(itemTitle);
        setEditMode(false)
    }
    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }
    return (
        editMode?
            <TextField
                variant="standard"
                size="small"
                autoFocus
                onBlur={offEditMode}
                value={itemTitle}
                onChange={changeItemTitleHandler}/>:
            <span onDoubleClick={onEditMode}>{title}</span>
    );
};

