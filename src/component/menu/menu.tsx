import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { copyData, removeData } from "../../redux/store/copySave";
import Tooltip from "@mui/material/Tooltip";
import MoodIcon from '@mui/icons-material/Mood';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import FavoriteIcon from '@mui/icons-material/Favorite';
import GradeIcon from '@mui/icons-material/Grade';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FaceIcon from '@mui/icons-material/Face';
const ProductItem = React.memo(({ product, onFavorite }) => {
  console.log(`Rendering ${product?.name}, ${product?.isFavorite}`);
  return (
    <div key={product?.id} className="product-card">
      <img
        src={product?.image}
        alt={product?.name}
        className="product-image"
      />

      <h3 className="product-name">{product?.name}</h3>

      <button
        onClick={() => onFavorite(product?.id)}
        className={`favorite-btn ${product?.isFavorite ? 'favorite' : 'not-favorite'}`}
      >
        {product?.isFavorite ? "❤️ Unfavorite" : "🤍 Favorite"}
      </button>
    </div>

  );
});
function MenuComponent({ listPro }: { listPro: any[] }) {
  const count = useSelector((state: RootState) => state.cache.value);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isShowCopy, setShowCopy] = React.useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [icon, setIcon] = React.useState('')
  const [listIcons, setListIcons] = React.useState([
    {
      "key": 'smile-icon',
      "value": <SentimentSatisfiedAltIcon />,
      "tooltip": "icon cười",
      "text": "😂"
    }
    ,
    {
      "key": 'sad-icon',
      "value": <SentimentVeryDissatisfiedIcon />,
      "tooltip": "icon buồn",
      "text": "😢"
    },
    {
      "key": 'angry-icon',
      "value": <SentimentDissatisfiedIcon />,
      "tooltip": "icon tức giận",
      "text": "😡"
    },
    {
      "key": 'like-icon',
      "value": <ThumbUpIcon />,
      "tooltip": "icon like",
      "text": "👍"
    },
    {
      "key": 'unlike-icon',
      "value": <ThumbDownIcon />,
      "tooltip": "icon unlike",
      "text": "👎"
    },
    {
      "key": 'heart-icon',
      "value": <FavoriteIcon />,
      "tooltip": "icon tym",
      "text": "❤️"
    },
    {
      "key": 'grade-icon',
      "value": <GradeIcon />,
      "tooltip": "icon sao",
      "text": "⭐"
    },
    {
      "key": 'fire-icon',
      "value": <LocalFireDepartmentIcon />,
      "tooltip": "icon lửa",
      "text": "🔥"
    },
    {
      "key": 'kid-icon',
      "value": <FaceIcon />,
      "tooltip": "icon kid",
      "text": "🧒"
    },
  ])
  const [listCopy, setListCopy] = useState<any[]>(listIcons);
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
        :
        null
    );

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
  };

  // // cursor pointer check
  const paste = (type?: string) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart!;
    const end = input.selectionEnd!;

    const newText =
      cache.slice(0, start) + JSON.stringify(count[count.length - 1]) + cache.slice(end);

    setCache(newText);

    requestAnimationFrame(() => {
      const pos = start + count.length;
      input.setSelectionRange(pos, pos);
    });
  };

  const pasteClipBoard = (element?: any, icon?: boolean) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart!;
    const end = input.selectionEnd!;

    if (icon) {
      const newText =
        cache.slice(0, start) + element + cache.slice(end);
      setCache(newText);

      requestAnimationFrame(() => {
        const pos = start;
        input.setSelectionRange(pos, pos);
      });
    }
    else {
      const newText =
        cache.slice(0, start) + JSON.stringify(element) + cache.slice(end);
      setCache(newText);
      requestAnimationFrame(() => {
        const pos = start;
        input.setSelectionRange(pos, pos);
      });
    }
  };

  const [products, setProducts] = useState([...listPro]);

  const favoriteProducts = useMemo(() => {
    return products.filter(p => p.isFavorite);
  }, [products]);
  

  const toggleFavorite = useCallback((id: any) => {
    // console.log(products)
    setProducts((prevProducts) =>
      prevProducts?.map(product =>
        product?.id === id ? { ...product, isFavorite: !product?.isFavorite } : product
      )
    );
  }, []);


  useEffect(() => {
    if (count) {
      setCache("");
    }
    if(listPro){
    setProducts([...listPro])
    }
  }, [count,listPro]);

  // const setWishlist = (productId: any): any => {
  //   const element: any = products.filter(v => v.id === productId)
  //   return { ...element[0], isFavorite: !element[0]?.isFavorite }
  // }

  const searchValue = (value: string) => {
    if (value) {
      const icons = listCopy.filter(e => e.tooltip.trim().toLowerCase().includes(value.trim().toLowerCase()))
      setListIcons(icons)
    } else {
      setListIcons(listCopy)
    }
  }

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
      <div className="w-full p-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Product List</h2>
        <div className="flex space-even">
          {products.length ? products?.map(product => (
            <ProductItem
              key={product?.id}
              product={product}
              onFavorite={
                toggleFavorite
              }
            />
          )) : (<div>Khong co san pham nao !</div>)}
        </div>
      </div>
      <div>
        <div>
          <h2>My Favourite Products</h2>
          <div className="flex space-x-10 w-full align-items space-even">
            <>

              {
                favoriteProducts?.length ?
                favoriteProducts?.map((product, index) => (
                    <div key={index} className="product-card">
                      <img
                        src={product ? product?.image : undefined}
                        alt={product ? product?.name : undefined}
                        className="product-image"
                      />

                      <h3 className="product-name">{product ? product?.name : undefined}</h3>
                    </div>
                  )) : (<div>Ko co sp nao</div>)
              }
            </>
          </div>
        </div>
      </div>
      <h2>Comments</h2>
      <TextareaAutosize
        ref={inputRef}
        onChange={(e) => setCache(e.target.value)}
        minRows={8}
        maxRows={8}
        placeholder="Maximum 4 rows"
        value={cache}
        style={{ width: "100%", maxWidth: "100%" }}
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
        <MenuItem onClick={() => paste('')}>
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
        sx={{ overflow: "hidden", maxHeight: 400, width: 500 }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <div className="flex align-center">
          <Tooltip title="Icon list">
            <IconButton >
              <MoodIcon onClick={() => {
                setShowCopy(false)
              }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Paste">
            <IconButton>
              <AssignmentIndIcon sx={{ cursor: "pointer" }}
                onClick={() => {
                  setShowCopy(true)
                }
                } />
            </IconButton>
          </Tooltip>
          <h5>Clip board</h5>
          <Tooltip title="Xóa">
            <IconButton>
              <DeleteIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(removeData(count));
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
        {isShowCopy ? count?.map((element: any, index: any) => (
          <MenuItem disabled={!element} key={index} onClick={() => pasteClipBoard(element, false)} {...a11yProps(index)}>
            {element ? element?.name : 'Khong co du lieu'}
          </MenuItem>
        )) :
          <>
            <div>
              <List sx={{
                width: 200, bgcolor: 'background.paper', maxHeight: 128, display: 'flex', flexWrap: 'wrap',
                gap: 0
              }}>
                <div className="div_text">
                  <TextField
                    size="small"
                    type="text"
                    sx={{ width: 140, height: 20 }}
                    onChange={(e) => setIcon(e.target.value)}
                    label="Icon"
                    value={icon}
                    id="fullWidth"
                  />
                  <IconButton onClick={() => searchValue(icon)} >
                    <Search />
                  </IconButton>
                </div>
                {listIcons.map((e: any, index: any) => (
                  <ListItem sx={{ padding: 0, width: 50 }} key={e.key}>
                    <Tooltip title={e.tooltip}>
                      <IconButton onClick={() => pasteClipBoard(e.text, true)} {...a11yProps(index)} >
                        {e.value}
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                ))
                }
              </List>
            </div>
          </>
        }
      </Menu>
    </div>
  );
}

export default MenuComponent;
