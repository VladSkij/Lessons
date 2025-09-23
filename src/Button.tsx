
type Props={
    title: string,
    onClickFunction?:()=>void,
    disabled?:boolean,
}

export const Button =({title, onClickFunction, disabled}:Props)=>{
    return (
        <button
            disabled={disabled}
            onClick={onClickFunction}>{title}</button>
    )
}