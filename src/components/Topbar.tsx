import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Menu,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Person, ArrowBack } from "@mui/icons-material";
import { COLORS } from "../utils/colors";
import { useData } from "../context/DataProvider";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig/firebaseConfig";
interface TopbarProps {
  homepage?: boolean;
  backBtnClick?: () => void;
  pageTitle?: string;
}

const Topbar = (props: TopbarProps) => {
  const { homepage, backBtnClick, pageTitle } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { adminMode, setAdminMode, isAdmin, currentUser } = useData();
  const navigate = useNavigate();
  const handleLogout = () =>{
    auth.signOut()
    navigate('/login')
  }
  return (
    <>
      {homepage ? (
        <Box style={{ ...styles.topBar, ...styles.homePage }}>
          {isAdmin && <FormControlLabel
            label={adminMode ? "Admin mode" : "User mode"}
            control={
              <Switch
                checked={adminMode}
                onChange={(e) => setAdminMode(e.target.checked)}
              />
            }
          />}

          <Box onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Person style={styles.accIcon} />
          </Box>

          <Menu
            // style={styles.menu}
            MenuListProps={{ style: styles.menu }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <Typography>{currentUser?.email}</Typography>
            <Divider/>
            <Button
              style={styles.logoutBtn}
            onClick={()=>handleLogout()}>Logout</Button>
          </Menu>
        </Box>
      ) : (
        <Box style={{ ...styles.topBar, ...styles.page }}>
          <ArrowBack
            onClick={() => (backBtnClick ? backBtnClick() : navigate(-1))}
            style={styles.backBtn}
          />
          <Typography>{pageTitle}</Typography>
        </Box>
      )}
    </>
  );
};
export default Topbar;
const styles = {
  topBar: {
    height: 40,
    // width: "100%",
    backgroundColor: COLORS.primaryColor,
    display: "flex",
    alignItems: "center",
    padding: "10px",
  },
  homePage: {
    justifyContent: "end",
  },
  page: {},
  accIcon: {
    backgroundColor: "white",
    borderRadius: "50px",
    color: COLORS.primaryColor,
    padding: 4,
    cursor: "pointer",
  },
  menu: {
    padding: "8px 8px",
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'column'
  } as React.CSSProperties,
  backBtn: {
    cursor: "pointer",
  },
  logoutBtn:{
    width:'100%'
  }
};
