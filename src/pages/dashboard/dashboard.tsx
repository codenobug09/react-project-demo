
import BottomAppBar from '../../component/appbottom/bottom';
import ProminentAppBar from '../../component/apptop/top';
import './dashboard.css';
import MenuComponent from '../../component/menu/menu';
import { useState } from 'react';
import ChildComponent from '../../component/childcomponent/child';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { GridArrowDownwardIcon } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";


export const ListConfigField = [
  {
    label: "Product Name",
    field: "name",
    type: "text",
  }, 
  {
    label: "Image",
    field: "image",
    type: "text",
  }
]

function Dashboard() {
  const [isFilterSearchForm, setIsFilterSearch] = useState(false);

  const [isShowForm, setShowForm] = useState(false);
  const [action, setAction] = useState("");
  const [search, setName] = useState("");

  const [info, getInfo] = useState([
    { id: 1, name: 'Product 1', image: 'https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg', isFavorite: false },
    { id: 2, name: 'Product 2', image: 'https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg', isFavorite: false },
    { id: 3, name: 'Product 3', image: 'https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg', isFavorite: false },
  ]);

  const [listCopy, setListCopy] = useState(info);

  const handleSubmitChild = (formData: any) => {
    const payload = {
      id: Math.random(),
      ...formData,
      isFavorite: false
    }
    getInfo([...info, payload])
    setListCopy([...listCopy, payload])
    console.log(info)
    
  }
  const closeDialog = (isShowForm: boolean) => {
    setShowForm(isShowForm);
  };

  const showCreate = (isShowDialog: boolean) => {
    setShowForm(isShowDialog);
    setAction("create");
  };
  
  const isFilterSearch = (isShowDialog: boolean) => {
    setIsFilterSearch(isShowDialog);
  };

  const searchValue = () => {
    if(search) {
     const element = listCopy.filter(v => v.name.trim().toLowerCase().includes(search.trim().toLowerCase()))
     getInfo([...element])
    }
    else {
      getInfo([...listCopy])
    }
  };

  const resetForm = () => {
    setName("");
    searchValue();
  };

  return (
    <>
      <ChildComponent
        isShowCustom={false}
        listConfigField={ListConfigField}
        closeDialog={closeDialog}
        isShowForm={isShowForm}
        action={action}
        info={info}
        dataFlow={handleSubmitChild}
      />
      {/* <DialogComponent
          selection={selectionBooolean}
          showDialog={showDialog}
          isShowDialog={isShowDialog}
        /> */}
      <ProminentAppBar  showSearch={true} isFilterSearch={isFilterSearch} />
      <div>
      {isFilterSearchForm ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<GridArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Tìm kiếm</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex">
              <Box sx={{ width: 750, maxWidth: "100%" }}>
                <TextField
                  size="small"
                  type="text"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  label="Tên"
                  value={search}
                  id="fullWidth"
                />
              </Box>
            </div>
            <div className="btn-search">
              <Button
                variant="contained"
                onClick={() => {
                  searchValue();
                }}
                endIcon={<SearchIcon />}
              >
                Tìm kiếm
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  resetForm();
                }}
                endIcon={<RestartAltIcon />}
              >
                Reset
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ) : (
        <div></div>
      )}
        <MenuComponent listPro={info} />
      </div>
      <BottomAppBar showCreate={true} isShowForm={showCreate} />
    </>
  )
}
export default Dashboard;