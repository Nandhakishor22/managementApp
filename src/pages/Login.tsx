import { Email, Key} from '@mui/icons-material'
import { Box, Button, InputAdornment, TextField, Typography, createStyles, withStyles } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from 'react'
import {db,auth} from '../firebaseConfig/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataProvider';


export const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const {handleLogin} = useData()
    const navigate = useNavigate()
    const login = () =>{
        setLoading(true)
        signInWithEmailAndPassword(auth,email,password).then(()=>{
           const redirect =  handleLogin()
           navigate(redirect)
        }).catch((errorCode)=>{
            if (errorCode === "auth/wrong-password") {
                setLoading(false);
                console.log('error while logging in: ',errorCode)
              } else if (errorCode === "auth/user-not-found") {
                setLoading(false);
                console.log('error while logging in: ',errorCode)
              } else {
                console.error(errorCode);
                setLoading(false);
              }
        })
    }
    return(
        <Box sx={styles.mainContainer}>
        <Box style={styles.loginContainer}>
            <Typography>Login</Typography>
            <TextField
                style={styles.input}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                placeholder='Email'
            />
             <TextField
                style={styles.input}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Password'
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Key/>
                      </InputAdornment>
                    ),
                  }}
            />
            <LoadingButton
                loading={loading}
                onClick={login}
                title='Login'

            >Login</LoadingButton>
            <Button onClick={()=>navigate('/signup')}>Create account</Button>
        </Box>
        </Box>
    )
}
const styles = {
    mainContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'

    },
    loginContainer:{
        height: '65vh'
    },
    input:{
        display: 'block',
        marginTop:10
    }
}


