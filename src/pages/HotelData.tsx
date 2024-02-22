import {
  Box,
  Button,
  Dialog,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Topbar from "../components/Topbar";
import { useLocation } from "react-router-dom";
import { HotelDetails, hotelData } from "../context/DataProvider";
import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import OverallData from "../components/OverallData";
import AllDatas from "../components/AllDatas";

const HotelData = () => {
  const { state } = useLocation();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const hotelDetail = state.hotelDetails as HotelDetails;
  const [hotelData, setHotelData] = useState<hotelData>({
    deliveredDate: null,
    cylinderType: "",
    quantity: null,
    updatedBy: "",
    balance: null,
    paidAmount: null,
  });
  const cylinderType = [
    {
      name: "12Kg",
    },
    {
      name: "17Kg",
    },
    {
      name: "33Kg",
    },
  ];
  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHotelData((prev)=>{
        return{
            ...prev,
            [e.target.name] : e.target.value
        }
    })
};
  return (
    <Box>
      <Topbar pageTitle={hotelDetail.hotelName} />
      <Box
        style={styles.fab}
        onClick={() => {
          setModal(true);
        }}
      >
        <Add />
      </Box>
      <Dialog
        PaperProps={{ style: styles.modal }}
        open={modal}
        onClose={() => setModal(false)}
      >
        <Box style={styles.modalContainer}>
          <Typography style={styles.title}>Add Hotel</Typography>
          <Box style={styles.inputContainer}>
            <TextField
              style={styles.input}
              name="deliveredDate"
              label="Delivered Date"
              onChange={(e) => handleData(e)}
              value={hotelData.deliveredDate}
            />
            <Select
            style={styles.input}
              labelId="Select"
              label='select'
              name="cylinderType"   
              renderValue={()=><Typography>{hotelData.cylinderType}</Typography>}
              value={hotelData.cylinderType}
              onChange={(e) => handleData(e as any)}
            >
              {cylinderType.map((type) => (
                <MenuItem value={type.name}>{type.name}</MenuItem>
              ))}
            </Select>
            <TextField
              style={styles.input}
              name="qunatity"
              label="Quantity"
              onChange={(e) => handleData(e)}
            />
            <TextField
              style={styles.input}
              name="paidAmount"
              label="Amount Paid"
              value={hotelData.paidAmount}
              onChange={(e) => handleData(e)}
            />
            <TextField
              style={styles.input}
              name="balance"
              label="Balance Amount"
              value={hotelData.balance}
            />
          </Box>
          <Box style={styles.btnContainer}>
            <Button onClick={() => setModal(false)}>Cancel</Button>
            <LoadingButton loading={loading} onClick={() => {}}>
              Add
            </LoadingButton>
          </Box>
        </Box>
      </Dialog>
      <Box style={styles.detailContainer}>
        <Box>
          <Typography>Overall Data: </Typography>
        <OverallData/>
        </Box>
        <Box>
          <AllDatas/>
        </Box>
      </Box>
    </Box>
  );
};
export default HotelData;
const styles = {
  detailContainer: {
    padding:10
  },
  fab: {
    position: "fixed",
    width: "60px",
    height: "60px",
    bottom: "40px",
    right: "40px",
    backgroundColor: "#0C9",
    color: "$FFF",
    borderRadius: "50px",
    textAlign: "center",
    boxShadow: "2px 2px 3px #999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  } as React.CSSProperties,
  modal: {
    width: "50%",
  },
  modalContainer: {
    padding: "10px 20px",
  },
  title: {
    fontSize: 20,
  },
  inputContainer: {},
  input: {
    width: "100%",
    marginTop: "2%",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px",
  },
};
