import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  makeStyles,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";
import { AddHotel } from "../services/backendServices";
import { HotelDetails, useData } from "../context/DataProvider";
import { COLORS } from "../utils/colors";

const Hotels = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { hotels } = useData();
  const [allHotels, setAllHotels] = useState(hotels);
  const [searchName, setSearchName] = useState("");
  const [hovering, setHovering] = useState<number|null>(null);
  const [hotelDetails, setHotelDetails] = useState<HotelDetails>({
    hotelName: "",
    hotelAddress: "",
    hotelPincode: 0,
    hotelContact: 0,
    hotelExpectedQuantity: 0,
  });
  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHotelDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const addHotel = async () => {
    console.log("FUNCTIONCALLED");
    const result = await AddHotel(hotelDetails);
    console.log("RESULT", result);
  };
  const navigate = useNavigate();
  const handleSearch = (name: string) => {
    setSearchName(name);
    if (hotels && name.trim() !== "") {
      const filteredData = hotels.filter((hotel) =>
        hotel.hotelName.toLowerCase().includes(name)
      );
      setAllHotels(filteredData);
      return;
    }
    setAllHotels(hotels);
  };
  const handleHotelClick = (hotelDetails: HotelDetails) => {
    navigate("/view", {
      state: {
        hotelDetails,
      },
    });
  };
  useEffect(() => {
    setAllHotels(hotels);
  }, [hotels]);
  return (
    <Box>
      <Topbar pageTitle="Hotels" backBtnClick={() => navigate(-1)} />
      <Box
        style={styles.fab}
        onClick={() => {
          setModal(!modal);
        }}
      >
        <Add />
      </Box>
      <Box style={styles.searchContainer}>
        <TextField
          label="Search by hotel name"
          value={searchName}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Box>
      <Box style={styles.hotelContainer}>
        {allHotels?.map((hotel, index) => (
          <Box
            style={{
              ...styles.hotel,
              filter: hovering === index ? "opacity(0.8)" : "none",
            }}
            onMouseEnter = {()=>setHovering(index)}
            onMouseLeave={()=>setHovering(null)}
            key={index}
            onClick={() => handleHotelClick(hotel)}
          >
            <Typography>{hotel.hotelName}</Typography>
          </Box>
        ))}
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
              value={hotelDetails.hotelName}
              style={styles.input}
              onChange={handleData}
              name="hotelName"
              label="Hotel Name"
            />
            <TextField
              value={hotelDetails.hotelAddress}
              style={styles.input}
              name="hotelAddress"
              label="Hotel Address"
              onChange={handleData}
            />
            <TextField
              value={hotelDetails.hotelPincode}
              style={styles.input}
              name="hotelPincode"
              label="Pincode"
              onChange={handleData}
            />
            <TextField
              value={hotelDetails.hotelContact}
              style={styles.input}
              name="hotelContact"
              label="Contact number"
              onChange={handleData}
            />
            <TextField
              value={hotelDetails.hotelExpectedQuantity}
              style={styles.input}
              name="hotelExpectedQuantity"
              label="Expected quantity per month (optional)"
              onChange={handleData}
            />
          </Box>
          <Box style={styles.btnContainer}>
            <Button onClick={() => setModal(false)}>Cancel</Button>
            <LoadingButton loading={loading} onClick={() => addHotel()}>
              Add
            </LoadingButton>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};
export default Hotels;
const styles = {
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
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    marginTop: "10px",
  },
  search: {
    width: 300,
    height: 30,
    "& input": {
      height: 30,
    },
    "& label": {
      height: 30,
    },
  },
  hotelContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "auto",
    maxHeight: "75vh",
    overflow: "auto",
  } as React.CSSProperties,
  hotel: {
    backgroundColor: COLORS.primaryColor,
    width: "90%",
    marginTop: 10,
    padding: "20px 10px",
    borderRadius: 10,
    cursor: 'pointer'
  } as React.CSSProperties,
};
