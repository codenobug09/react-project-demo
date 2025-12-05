import { useEffect, useRef, useState } from 'react';
import './menu.css';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentPaste from '@mui/icons-material/ContentPaste';
import type { AppDispatch, RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
function MenuComponent() {
  const count = useSelector((state: RootState) => state.cache.value);
  const dispatch = useDispatch<AppDispatch>();

        const [cache, setCache] = useState('');
        const [contextMenu, setContextMenu] = useState<{
            mouseX: number;
            mouseY: number;
          } | null>(null);
          

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
                  null,
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
            // setCache('');
          };

          // cursor pointer check
          const paste = () => {
            const input = inputRef.current;
            if (!input) return;
        
            const start = input.selectionStart!;
            const end = input.selectionEnd!;

            const newText =
              cache.slice(0, start) + count + cache.slice(end);
        
            setCache(newText);
  
            requestAnimationFrame(() => {
              const pos = start + count.length;
              input.setSelectionRange(pos, pos);
            });
          };
          
          useEffect(() => {
            if(count) {
                setCache('')
            }
        }, [count]);
        
          return (
            <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
             <TextareaAutosize
             ref={inputRef}
             onChange={(e) => setCache(e.target.value)}
             minRows={8}
             maxRows={8}
            placeholder="Maximum 4 rows"
            value={cache}
             style={{ width: 845 }} />
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
                <MenuItem  onClick={paste}> <ListItemIcon>
            <ContentPaste
             fontSize="small" />
          </ListItemIcon>Paste</MenuItem>
              </Menu>
            </div>
          );
}

export default MenuComponent;