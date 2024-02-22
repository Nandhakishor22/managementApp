import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { AllDatasTableHeader } from "../utils/utils";

const AllDatas = () => {
  function generateData() {
    const dataEntries = [];
    const workTypes = ["Delivery", "Return"];

    for (let i = 0; i < 15; i++) {
      // Generate random values for the fields
      const workType = workTypes[Math.floor(Math.random() * workTypes.length)];
      const quantity = Math.floor(Math.random() * 100) + 1;
      const date = Date.now();
      const time = Date.now();
      const paidAmount = Math.floor(Math.random() * 9001) + 1000;
      const balanceAmount = Math.floor(Math.random() * 30001) + 20000;
      const updatedBy = "TestUser";

      // Create a data entry object
      const dataEntry = {
        workType: workType,
        quantity: quantity,
        date: date,
        time: time,
        paidAmount: paidAmount,
        balanceAmount: balanceAmount,
        updatedBy: updatedBy,
      };

      // Add the data entry to the list
      dataEntries.push(dataEntry);
    }

    return dataEntries;
  }
  const data = generateData();
  const testData = [
    {
      workType: "Delivery",
      quantity: 100,
      date: Date.now(),
      time: Date.now(),
      paidAmount: 10000,
      balanceAmount: 30000,
      updatedBy: "TestUser",
    },
  ];
  console.log("DATA123", data);
  return (
    <TableContainer style={styles.tableContainer}>
      <Table>
        <TableHead style={styles.tableHeader}>
          <TableRow>
            {AllDatasTableHeader.map((table) => (
              <TableCell>{table.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data: any) => (
            <TableRow>
              {AllDatasTableHeader.map((header) => (
                <TableCell>{data[header.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AllDatas;
const styles = {
  tableContainer:{
    height:'55vh'
  },
  tableHeader:{
    position: 'sticky',
    top:0,
    backgroundColor:'white'
  } as React.CSSProperties
};
