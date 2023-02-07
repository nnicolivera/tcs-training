import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from '@mui/material'

const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [psw, setPsw] = useState('')

    const handleUser = (user) => {
        setUser(user)
    }

    const handlePsw = (psw) => {
        setPsw(psw)
    }

    const intro = (e) => {
        let userinput = document.getElementById("userinput")
        let pswinput = document.getElementById("pswinput")
        e.preventDefault()
        localStorage.setItem('user', JSON.stringify({ user: userinput.value }))
        localStorage.setItem('psw', JSON.stringify({ psw: pswinput.value }))
        navigate("/todoform")
    }

    return (
        <>
            <h1>Please, login</h1>
            <form onSubmit={(e) => intro(e)}>
                <Input id="userinput" type="email" placeholder="Email" required onChange={() => handleUser(user)} />
                <br />
                <Input id="pswinput" type="password" placeholder="Password" required onChange={() => handlePsw(psw)} />
                <br /><br />
                <Button variant="outlined" type="submit">Login</Button>
            </form>
        </>
    )
}

export default Login