import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });
  let suggestions = props.suggestions;
  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };
  if (suggestions) {
    const fullList = side => (
      <div
        className={classes.fullList}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <ul>
          {suggestions.map((suggestion, i) => {
            return (
              <li key={i}>
                {suggestion.Name} - {suggestion.Type}
              </li>
            );
          })}
        </ul>
      </div>
    );
    return (
      <div>
        <Button variant="contained" onClick={toggleDrawer("bottom", true)}>
          Suggestions
        </Button>

        <Drawer
          anchor="bottom"
          open={state.bottom}
          onClose={toggleDrawer("bottom", false)}
        >
          {fullList("bottom")}
        </Drawer>
      </div>
    );
  }
  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    ></div>
  );
  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer("bottom", true)}>
        Suggestions
      </Button>

      <Drawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer("bottom", false)}
      >
        {fullList("bottom")}
      </Drawer>
    </div>
  );
}
