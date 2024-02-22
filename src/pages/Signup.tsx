import { Email, Key} from '@mui/icons-material'
import { Box, InputAdornment, TextField, Typography, createStyles, withStyles } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from 'react'
import {db,auth} from '../firebaseConfig/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export const Signup = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rPassword, setRpassword] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const handleLogin = () =>{
        setLoading(true)
        createUserWithEmailAndPassword(auth,email,password).then(()=>{

        }).catch((errorCode)=>{
           
                console.error(errorCode);
                setLoading(false);
              
        })
    }
    return(
        <Box sx={styles.mainContainer}>
        <Box style={styles.loginContainer}>
            <Typography>Create Account</Typography>
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
              <TextField
                style={styles.input}
                value={rPassword}
                onChange={(e)=>setRpassword(e.target.value)}
                placeholder='Re-Enter Password'
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
                onClick={handleLogin}
                title='Login'

            >Create</LoadingButton>
            <Typography>Have an account? <span onClick={()=>navigate('/login')}>Login</span></Typography>
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


