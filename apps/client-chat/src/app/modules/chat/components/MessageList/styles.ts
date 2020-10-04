import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  fileUpload: {
    "& .rce-mbox": {
      padding: 0,
      borderRadius: "6px",
    },
    "& .rce-mbox-text:after": {
      content: "unset",
    },
    "& .rce-mbox-photo": {
      backgroundColor: "white",
    },
    "& .rce-mbox-time-block": {
      marginRight: 2,
    },
    "& .rce-mbox-time": {
      fontWeight: 700,
      textShadow:
        "-0.4px -0.4px 0 #000, 0   -0.4px 0 #000, 0.4px -0.4px 0 #000, 0.4px  0   0 #000, 0.4px  0.4px 0 #000, 0    0.4px 0 #000, -0.4px  0.4px 0 #000, -0.4px  0   0 #000",
    },
  },
  photoMessage: {
    "& .rce-mbox": {
      padding: 0,
    },
    "& .rce-mbox-photo": {
      backgroundColor: "white",
    },
    "& .rce-mbox-text:after": {
      content: "unset",
    },
    "& .rce-mbox-time-block": {
      marginRight: 2,
    },
    "& .rce-mbox-time": {
      fontWeight: 700,
      textShadow:
        "-0.4px -0.4px 0 #000, 0   -0.4px 0 #000, 0.4px -0.4px 0 #000, 0.4px  0   0 #000, 0.4px  0.4px 0 #000, 0    0.4px 0 #000, -0.4px  0.4px 0 #000, -0.4px  0   0 #000",
    },
  },
  buttonLoad: {
    margin: 0,
    minWidth: 40,
    padding: "8px 16px",
  },
}));

export default useStyles;
