import { makeStyles, alpha } from "@material-ui/core/styles";

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    backgroundColor: "#323232",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  toolbar: theme.mixins.toolbar,
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    marginTop: "50px",
    height: "100%",
    position: "fixed",
    width: "4rem",
    padding: "10px",
    direction: "column",
    display: "flex",
    alignItems: "left",
    justifyContent: "left",
    backgroundColor: "silver",
  },
  title: {
    flexGrow: 1,
    alignContent: "center",
    display: "flex",
    textDecoration: "none",
  },
  grow: {
    flexGrow: 1,
  },
  box: {
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  leftNavbar: {},
  ul: {
    margin: 0,
    padding: 0,
  },
  li: {
    color: "black",
    listStyleType: "none",
    borderRadius: "5px",
    padding: "0.5rem 0.8rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: " all 0.3s ease-in-out",
    fontSize: "0.5rem 03.8rem",
  },
}));
