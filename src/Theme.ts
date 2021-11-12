import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#5bb0ff",
      darker: "#0c6ecb",
    },
    neutral: {
      main: "#db4809",
      contrastText: "#fff",
    },
  },
  components: {
    // Name of the component
    MuiFormControlLabel: {
      styleOverrides: {
        // Name of the slot

        label: {
          // Some CSS
          fontSize: "0.8rem",
        },
      },
    },
  },
});
export default theme;
