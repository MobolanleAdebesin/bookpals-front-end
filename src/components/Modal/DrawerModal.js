import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import "./DrawerModal.css";

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
        {suggestions.map((suggestion, i) => {
          return (
            <div key={i} className="DrawerModal-suggestion-card">
              {suggestion.Name} - {suggestion.Type}
              <a href={`\n ${suggestion.yUrl} `}>{suggestion.yUrl}</a>
            </div>
          );
        })}
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
    >
      No Suggestions
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
