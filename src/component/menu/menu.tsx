import React, { useEffect, useRef, useState } from "react";
import "./menu.css";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentPaste from "@mui/icons-material/ContentPaste";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeData } from "../../redux/store/copySave";

function MenuComponent() {
  const count = useSelector((state: RootState) => state.cache.value);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [cache, setCache] = useState("");
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  //context menu
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );

    // Prevent text selection lost after opening the context menu on Safari and Firefox
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      setTimeout(() => {
        selection.addRange(range);
      });
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClose = () => {
    setContextMenu(null);
    setAnchorEl(null);
    // setCache('');
  };

  // // cursor pointer check
  const paste = () => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart!;
    const end = input.selectionEnd!;

    const newText =
      cache.slice(0, start) + count[count.length - 1] + cache.slice(end);

    setCache(newText);

    requestAnimationFrame(() => {
      const pos = start + count.length;
      input.setSelectionRange(pos, pos);
    });
  };

  const pasteClipBoard = (element ?: any) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart!;
    const end = input.selectionEnd!;

    const newText =
      cache.slice(0, start) + element + cache.slice(end);

    setCache(newText);

    requestAnimationFrame(() => {
      const pos = start;
      input.setSelectionRange(pos, pos);
    });
  };

  useEffect(() => {
    if (count) {
      setCache("");
    }
  }, [count]);

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
      <TextareaAutosize
        ref={inputRef}
        onChange={(e) => setCache(e.target.value)}
        minRows={8}
        maxRows={8}
        placeholder="Maximum 4 rows"
        value={cache}
        style={{ width: 845 }}
      />
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={paste}>
          {" "}
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          Paste
        </MenuItem>
        <MenuItem onClick={handleClick}>
          {" "}
          <ListItemIcon>
            <ContentPasteGoIcon fontSize="small" />
          </ListItemIcon>
          Open Clip Board
        </MenuItem>
      </Menu>

      <Menu
        sx={{ overflow: "hidden", maxHeight: 300, width: '500px' }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="flex align-center">
        <IconButton>
        <AssignmentIndIcon />
        </IconButton> 
        <IconButton>
                  <DeleteIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(removeData());
                    }}
                  />
        </IconButton>
        </div>
        {count?.map((element: any, index: any) => (
          <MenuItem key={index} onClick={() => pasteClipBoard(element)} {...a11yProps(index)}>
            {element}{" "}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default MenuComponent;
