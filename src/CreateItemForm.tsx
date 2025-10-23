import {ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from '@mui/material/IconButton'
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';

type PropsType = {
    // createItemHandle:(newItemTitle:string)=>void,
    createItem:(newItemTitle:string)=>void,
    maxTitleLength: number,
    minTitleLength: number,
}

export const CreateItemForm = ({createItem, maxTitleLength, minTitleLength}:PropsType) => {
    const [itemTitle, setItemTitle] = useState("");
    const [error, setError] = useState(false);
    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setItemTitle(e.currentTarget.value)
    }
    const onKeyDownCreateItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && itemTitle.length >=minTitleLength && itemTitle.length < maxTitleLength) {
            createItemHandler();
        }
    }

    const createItemHandler = () => {
        const trimmedTaskTitle = itemTitle.trim();
        if (trimmedTaskTitle) {
            createItem(itemTitle);
        } else {
            setError(true);
        }

        setItemTitle("");
    }

    return (
        <div>
            <TextField
                variant="filled"
                size="small"
                autoFocus={true}
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onKeyDown={onKeyDownCreateItemHandler}
                // className={error ? "error" : ""}
                error={error}
                helperText={error && "Title is requared!"}
            />
            <IconButton
            onClick={createItemHandler}
            disabled={itemTitle.length < minTitleLength || itemTitle.length > maxTitleLength}
            >
            <AddBoxIcon fontSize="large" />
            </IconButton>
            {!error && itemTitle.length < minTitleLength && <div>title must be more then {minTitleLength} chartes</div>}
            {!error && itemTitle.length >= minTitleLength && itemTitle.length < maxTitleLength && <div>title must be less then 10 chartes</div>}
            {itemTitle.length >= maxTitleLength && <div style={{color: "red"}}>Max title length is {maxTitleLength} chartes</div>}
            {error && <div style={{color: "red"}}>Title is requared!</div>}
        </div>
    );
};
