// eslint-disable-next-line
import styles from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
  interface Theme {
    status: {
      danger: string;
    };
    palette: {
      primary: {
        main: string;
        darker: string;
      };
      neutral: {
        main: string;
        contrastText: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    palette: {
      primary: {
        main: string;
        darker: string;
      };
      neutral: {
        main: string;
        contrastText: string;
      };
    };
  }
}
