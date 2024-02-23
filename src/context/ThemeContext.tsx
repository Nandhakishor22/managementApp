import { ThemeProvider, createTheme } from "@mui/material/styles";

const offBlack = "#2a3142";
const bgGrey = '#dfe3e7';
const borderGrey = '#ccd2d9';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0000",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000",
    },
    // common: {
    //   offBlack,
    //   bgGrey,
    //   borderGrey,
    // },
  },
  typography: {
    fontFamily: 'Mitr, sans-serif',
  }
});

const ThemeContext = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeContext;