const palette = {
  primary: {
    main: "#881610",
  },
  secondary: {
    main: "#116367",
  },
  warning: {
    main: "#8cbf2f",
  },
  info: {
    main: "#116367", //"#51078b",
  },
  error: {
    main: "#9B1710", //"#51078b",
  },
  success: {
    main: "#116F74", //"#51078b",
  },
};

export const themeoverrides = {
  typography: {
    fontFamily: `"PT Sans Caption", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    selectedRow: {
      backgroundColor: palette.info.main,
    },
    notSelectedOr: {
      backgroundColor: "#fff",
    },
    body1: {
      fontFamily: `"PT Sans Caption", sans-serif`,
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: `"PT Sans Caption", sans-serif`,
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
    button: {
      textDecoration: "none",
      backgroundColor: palette.success.main,
      color: "#ffe",
      padding: 5,
      textTransform: "uppercase",
      borderRadius: 10,
      lineHeight: "2em",
      // height: "2em",
      fontWeight: 500,
      fontSize: "1em",
    },
    button2: {
      textDecoration: "none",
      backgroundColor: palette.secondary.main,
      color: "#fff",
      padding: 5,
      fontFamily: `"PT Sans Caption", sans-serif`,
      fontSize: "1em", ///"0.875rem",
      lineHeight: "1.5em",
      height: "1.5em",
      textTransform: "lowercase",
      borderRadius: 5,
      margin: 2,
      width: "fit-content",
      whiteSpace: "nowrap",
      boxShadow: "rgba(0, 0, 0, 0.15) 4.95px 1.95px 2.6px",
      // "&:hover": {
      //   backgroundColor: "#000", //palette.secondary.light,
      // },
    },
    littleLink: {
      textDecoration: "none",
      backgroundColor: palette.info.main,
      color: "#fff",
      padding: 3,
      // border: `2px solid ${palette.secondary.main}`,
      fontFamily: `"PT Sans Caption", sans-serif`,
      fontSize: ".8em", ///"0.875rem",
      lineHeight: ".8em",
      height: ".8em",
      textTransform: "lowercase",
      borderRadius: 5,
      // margin: 2,
      width: "fit-content",
      whiteSpace: "nowrap",
      // boxShadow: "rgba(0, 0, 0, 0.15) 4.95px 1.95px 2.6px",
      // "&:hover": {
      //   backgroundColor: "#000", //palette.secondary.light,
      // },
    },
    muiSizeBox: {
      backgroundColor: "#000", // palette.primary.main,
      color: palette.primary.contrastText,
    },
    label: {
      textDecoration: "none",
      backgroundColor: palette.info.main,
      color: "#fff",
      padding: 2,
      fontFamily: `"PT Sans Caption", sans-serif`,
      fontSize: "1em", ///"0.875rem",
      lineHeight: 1.1,
      textTransform: "lowercase",
      borderRadius: 5,
      margin: 2,
      width: "fit-content",
      whiteSpace: "nowrap",
      boxShadow: "rgba(0, 0, 0, 0.15) 4.95px 1.95px 2.6px",
    },
    menuitem: {
      flex: 1,
      textDecoration: "none",
      backgroundColor: "none",
      color: "#fff",
      fontFamily: `"PT Sans Caption", sans-serif`,
      fontWeight: 400,
      fontSize: 13,
      lineHeight: 1.75,
      textTransform: "uppercase",
    },
    survey: {
      whiteSpace: "none",
      color: "#fff",
      textDecoration: "none",
      backgroundColor: "#779279",
      padding: 10,
      fontFamily: `"PT Sans Caption", sans-serif`,
      fontSize: "1.5em", ///"0.875rem",
      lineHeight: 1.5,
      borderRadius: 5,
      margin: 0,
      width: "fit-content",
    },
  },
  palette: {
    tonalOffset: 0.2,
    primary: {
      main: palette.primary.main,
    },
    secondary: {
      main: palette.secondary.main,
    },
    warning: {
      main: palette.warning.main,
    },
    info: {
      main: palette.info.main, //"#51078b",
      // light: "#f0f0f0",
    },
    error: {
      main: palette.error.main, //"#51078b",
    },
    success: {
      main: palette.success.main, //"#51078b",
    },
  },
};
