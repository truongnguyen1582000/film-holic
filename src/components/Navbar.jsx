import { Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { cyan } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import Login from "features/Auth/components/Login";
import { logout } from "features/Auth/userSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    flexGrow: 1,
  },

  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textDecoration: "none",
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: "#0C2738",
  },
  closeBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  changeModeBtn: {
    marginBottom: theme.spacing(2),
  },
  accountItem: {
    fontSize: "40px",
    color: "#fff",
  },
  navLink: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "white",
    fontSize: 16,

    "&:hover": {
      color: "cyan",
    },
  },
  active: {
    color: "cyan",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);
  const isLoggedIn = !!user.id;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={`${classes.link} ${classes.toolbarLeft}`}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MovieFilterIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              HOLIC FILM
            </Typography>
          </Link>

          <NavLink
            activeClassName={classes.active}
            className={classes.navLink}
            to="/watch-later"
          >
            Watch Later
          </NavLink>

          {isLoggedIn ? (
            <IconButton onClick={handleClick}>
              <AccountCircleIcon className={classes.accountItem} />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={() => setOpen(true)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        id="simple-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(logout());
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      <Dialog
        open={open}
        onClose={() => {}}
        aria-labelledby="form-dialog-title"
      >
        <Login handleClose={() => setOpen(false)} />
        <DialogActions className={classes.closeBtn}>
          <Button onClick={() => setOpen(false)} color="primary">
            <CloseIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
