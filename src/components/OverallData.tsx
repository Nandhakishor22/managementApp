import { Box, Typography } from "@mui/material";
import React from "react";
import { overAllData } from "../utils/utils";

const OverallData = () =>{
    return(
        <Box style = {styles.mainContainer}>
            {overAllData.map((data)=>(
            <Box style={styles.innerContainer}>
                <Typography>{data.label}</Typography>
                <Typography>100</Typography>
            </Box>
            ))}
           
        </Box>
    )
}
export default OverallData
const styles = {
    mainContainer:{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        margin:'auto',
        border: '1px solid black',
        padding:10,
        borderRadius: 8,
        marginTop:10
    } as React.CSSProperties,
    innerContainer:{
        display: 'flex',
        justifyContent:'space-between',
        borderBottom: '1px solid black'
    }

}