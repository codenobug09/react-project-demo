import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import React from 'react';
import { Link, Navigate } from 'react-router';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 128,
  },
}));

let boolean = true;

export default function ProminentAppBar({
    isFilterSearch,
    showSearch
  }: {
    showSearch: boolean,
    isFilterSearch?: Function
  }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);
const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setAnchorEl(null);

  };
  return (
    
    <>
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <IconButton
        //    id="fade-button"
        //    aria-controls={open ? 'fade-menu' : undefined}
        //    aria-haspopup="true"
        //    aria-expanded={open ? 'true' : undefined}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleClick} 
          >
            <MenuIcon/>
            <Menu
     id="fade-menu"
     slotProps={{
       list: {
         'aria-labelledby': 'fade-button',
       },
     }}
     slots={{ transition: Fade }}
     anchorEl={anchorEl}
     open={open}
     onClose={handleClose}
   >
     <MenuItem> <Link to="/profile">Profile</Link></MenuItem>
     <MenuItem onClick={handleClose}>My account</MenuItem>
     <MenuItem onClick={handleClose}>Logout</MenuItem>
   </Menu>
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
          >
            MUI
          </Typography>
          { showSearch ? (
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon onClick={() => {
                boolean = !boolean
                isFilterSearch(boolean)}} />
          </IconButton> ) : (<div></div>)
  }
          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </Box>
   </>
  );
}
