
type Props={
    title: string,
    onClickFunction?:()=>void,
    disabled?:boolean,
    className?: string,
}

export const Button =({title, onClickFunction, disabled, className}:Props)=>{
    return (
        <button
            className={className}
            disabled={disabled}
            onClick={onClickFunction}>{title}</button>
    )
}