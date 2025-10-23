import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'


type NavBtnProps = {
    background?:string,
}

export const NavButton = styled(Button)<NavBtnProps>(({background , theme})=>({
    minWidth: '110px',
    fontWeight: '500',
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}, 4px 4px 0 0 ${theme.palette.primary.dark}`,
    borderRadius: '6px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '4px 10px',
    color: '#ffffff',
    background: background || theme.palette.primary.dark,
    '&:hover': {
        background: "darken(bg, 0.08)",
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}, 6px 6px 0 0 ${theme.palette.primary.dark}`,
        transform: 'translate(-1px, -1px)',
    },
}))