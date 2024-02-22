import React from "react";
import { Checklist } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";

const Menu = () =>{
    const navigate = useNavigate()
    const Menus = [
        {
            name: "Hotels",
            icon: <Checklist style={styles.icon} />,
            path: '/hotels'

        }
    ]
    return(
        <Box >
            <Topbar homepage/>
            <Box style={styles.menuContainer}>
            {Menus.map((menu)=>(
                <Box onClick={()=>{navigate(menu.path)}} style={styles.menu}>
                    {menu.icon}
                    <Typography>{menu.name}</Typography>
                </Box>
            ))}
            </Box>
        </Box>
    )
}
export default Menu
const styles = {
    icon:{
        width: 30,
        height: 30,
        padding:6,
        borderRadius: 50,
        boxShadow: '0px 0px 10px 1px gray'

    },
    menuContainer:{
        width:"90%",
        margin:'auto',
        marginTop:'10px'
    },
    menu:{
        cursor: 'pointer'
    }
}