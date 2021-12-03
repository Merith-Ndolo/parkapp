import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    marginTop: "100px",
    width: "100%",
    height: "100%",
    direction: "column",
    display: "flex",
    justify: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
  },
  filter: {
    display: "flex",
    padding: "1rem",
    margin: "1rem",
    justifyContent: "space-between",
  },
  formControl: {
    margin: 0,
    fullWidth: true,
    display: "flex",
    wrap: "nowrap",
  },
}));
