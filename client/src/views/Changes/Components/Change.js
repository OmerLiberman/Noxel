import React, {useReducer, useState} from 'react';

// Material UI
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { Button } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import BlockIcon from "@material-ui/icons/Block";

import { changeColor } from "../../../utils/colors";


const Change = ({
  changeMongoId,
  changeId,
  handled,
  status,
  changeType,
  description,
  classroomName,
  newMenu,
  oneTimeMenu,
  createdAt,
  handleDeleteClick,
  handleResolveClick,
  handleBlockClick,
}) => {
  // const classes = useStyles();

  const [open, setOpen] = useState(false);

  const icon = !handled ? (
      <div style={{ color: "orange" }}>
        <HighlightOffIcon />
      </div>
  ) : status === "resolved" ? (
      <div style={{ color: "green" }}>
        <CheckCircleIcon />
      </div>
  ) : (
    <div style={{ color: "red" }}>
      <BlockIcon />
    </div>
  );

  const handleClick = () => {
    setOpen(!open);
  };

  const forceUpdate = useReducer(bool => !bool)[1];

  const handleClickOnDelete = (event) => {
    //event.preventDefault();
    handleDeleteClick(changeMongoId);
  };

  const handleClickOnResolve = (event) => {
    //event.preventDefault();
    handleResolveClick(changeMongoId);
  };

  const handleClickOnBlock = (event) => {
    //event.preventDefault();
    handleBlockClick(changeMongoId);
  };


  return (
    <div
      style={{
        direction: "rtl",
        borderRadius: "10px",
        background: changeColor,
      }}
    >
      <ListItem button onClick={handleClick}>
        {" "}{icon}{" "}{" "}
        <ListItemText
          primary={
            <div style={{ textAlign: "right" }}>{`שינוי מספר ${changeId}`}</div>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            {" "}
            סטטוס:
            {handled ? "טופל" : "לא טופל"}
          </ListItem>

          <ListItem>
            {" "}
            סוג שינוי:
            {changeType}
          </ListItem>

          <ListItem>
            {" "}
            תיאור:
            {description}
          </ListItem>
        </List>

        <div
          style={{ display: "flex", flexDirection: "row", direction: "ltr" }}
        >
          <Tooltip title="מחק תפריט">
            <Button>
              <DeleteIcon onClick={handleClickOnDelete} />
            </Button>
          </Tooltip>
          <Tooltip title="בקשה טופלה">
            <Button>
              <CheckCircleIcon onClick={handleClickOnResolve} />
            </Button>
          </Tooltip>
          <Tooltip title="בקשה נדחתה">
            <Button>
              <BlockIcon onClick={handleClickOnBlock} />
            </Button>
          </Tooltip>
        </div>
      </Collapse>
    </div>
  );
};

export default Change;
