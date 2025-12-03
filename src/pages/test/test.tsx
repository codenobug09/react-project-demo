import React, { useEffect, useState } from 'react';
import AlertComponent from '../../component/alertcomponent/alert.tsx';
import ChildComponent from '../../component/childcomponent/child.tsx';
import './test.css';
import DialogComponent from '../../component/dialogcomponent/dialog.tsx';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { GridColDef } from '@mui/x-data-grid/models/colDef';
import Box from '@mui/material/Box';
import { DataGrid, GridArrowDownwardIcon } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import BottomAppBar from '../../component/appbottom/bottom.tsx';
import ProminentAppBar from '../../component/apptop/top.tsx';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function Test() {
  const [isShowForm, setShowForm] = useState(false);
  const [info, getInfo] = useState('');
  const [action, setAction] = useState('');
  const [search, setName] = useState('');
  const [type, setType] = useState('');
  const [selection, setSelection] = useState([]);
  const [listSelection, setListSelection] = useState<any[]>([]);
  const [message, setMessage]= useState('');
  const [isFilterSearchForm, setIsFilterSearch] = useState(false);
  const [working, setWorking] = useState('');
  const [notification, setNotification] = useState(false);
  const [infomation, getInformation] = useState(null);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [selectionBooolean, setSelectionBoolean] = useState(false);
  // const [loading, setLoading] = useState(false);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'index',
      headerName: 'STT',
      width: 90,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: 'name',
      headerName: 'Tên',
      width: 150,
    },
    {
      field: 'age',
      headerName: 'Tuổi',
      width: 150,
    },
    {
      field: 'live',
      headerName: 'Nơi sống',
      type: 'number',
      width: 110,
    },
    {
      field: 'work',
      headerName: 'Làm việc',
      type: 'number',
      width: 110,
    },
    {
      field: 'relationship',
      headerName: 'Tình trạng hôn nhân',
      description: 'This column has a value getter and is not sortable.',
      width: 160,
      valueGetter: (value: any, row: any) =>
        `${transformText(value) || transformText(row.relationship)}`,
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      description: 'This column has list actions',
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <div className="action-btn">
            {
              <BorderColorIcon
                color={'action'}
                onClick={() => {
                  handleRowClick(params, 'update');
                  setShowForm(true);
                }}
              />
            }
            {
              <DeleteIcon
                color={'error'}
                onClick={() => {
                  deleteRow(params);
                  setSelectionBoolean(false);
                }}
              />
            }
            {
              <VisibilityIcon
                color={'info'}
                onClick={() => {
                  handleRowClick(params, 'detail');
                  setShowForm(true);
                }}
              />
            }
          </div>
        </>
      ),
    },
  ];

  const [rows, setInfo] = useState([
    {
      id: 'TCI1',
      name: 'Nguyen Minh Chau',
      age: 22,
      live: 'Ha Noi',
      work: 'Thu cuc TCI',
      relationship: 'alone',
    },
    {
      id: 'TCI2',
      name: 'Nguyen Minh Tin',
      age: 30,
      live: 'Ha Noi',
      work: 'Thu cuc TCI',
      relationship: 'alone',
    },
    {
      id: 'TCI3',
      name: 'Nguyen Tan',
      age: 33,
      live: 'Ha Noi',
      work: 'Thu cuc TCI',
      relationship: 'family',
    },
    {
      id: 'TCI4',
      name: 'Nguyen Thach Thao',
      age: 20,
      live: 'Ha Noi',
      work: 'Thu cuc TCI',
      relationship: 'in-relationship',
    },
    {
      id: 'TCI5',
      name: 'Tran Hai Nam',
      age: 20,
      live: 'Ha Noi',
      work: 'Thu cuc TCI',
      relationship: '',
    },
  ]);

  const listOptions = ['Độc thân', 'Đã có gia đình', 'Đang hẹn hò'];
  const [listCopy, setListCopy] = useState<any[]>(rows);

  const handleSubmitChild = (formData: any) => {
    if (action.includes('create')) {
      rows.find(v => {
        if(v.name.includes(formData.name)){
          setMessage('Không được trùng tên !Thêm mới thất bại')
          setNotification(true);
          setType('error');
          setIsShowDialog(false);
          setInfo([...rows]);
          setListCopy([...listCopy]);

        }
        else {
          setInfo([...rows, formData]);
          setListCopy(listCopy.concat(formData));
          setNotification(true);
          setType('success');
          setIsShowDialog(false);}
      })
    } else {
      const updatedRows = rows.map((v) =>
        v.id === formData.id ? formData : v
      );
      const updateCopy = listCopy.map((v) =>
        v.id === formData.id ? formData : v
      );
      setMessage('')
      setInfo(updatedRows);
      setListCopy(updateCopy);
      setNotification(true);
      setType('success');
      setIsShowDialog(false);
    }
  };

  const handleRowClick = (information: any, action: any) => {
    getInfo(information);
    if (action.includes('update')) {
      setAction('update');
    } else {
      setAction('detail');
    }
  };

  const deleteRow = (information: any) => {
    setIsShowDialog(true);
    getInformation(information);
  };

  const searchValue = () => {
    const object = {
      search: search,
      relation: value,
      working: working,
    };

    // setLoading(true);

    if(object){
    const result = listCopy.filter(
      (v) =>
        v.name
          .trim()
          .toLowerCase()
          .includes(object.search.trim().toLowerCase()) &&
        v.relationship
          .trim()
          .toLowerCase()
          .includes(transformText(object.relation).trim().toLowerCase()) &&
        v.work
          .trim()
          .toLowerCase()
          .includes(object.working.trim().toLowerCase())
    );
    setInfo(result);
  }

    if (!object.search && !object.relation && !object.working) {
      setInfo(listCopy);
    }

    if (
      (object.search && !object.relation)
    ) {
      const result = listCopy.filter((v) =>
        v.name.trim().toLowerCase().includes(object.search.trim().toLowerCase()) &&
        v.work
        .trim()
        .toLowerCase()
        .includes(transformText(object.working).trim().toLowerCase())
      );
      setInfo(result);
    }

    if (
      (object.search && !object.working)
    ) {
      const result = listCopy.filter((v) =>
        v.name.trim().toLowerCase().includes(object.search.trim().toLowerCase()) &&
        v.relationship
        .trim()
        .toLowerCase()
        .includes(transformText(object.relation).trim().toLowerCase())
      );
      setInfo(result);
    }

    if(object.relation && object.working){
      const result = listCopy.filter((v) =>
      v.work.trim().toLowerCase().includes(object.working.trim().toLowerCase()) &&
      v.relationship
      .trim()
      .toLowerCase()
      .includes(transformText(object.relation).trim().toLowerCase())
    );
    setInfo(result);
    }

    if (
      (object.search && !object.relation && !object.working)
    ) {
      const result = listCopy.filter((v) =>
        v.name.trim().toLowerCase().includes(object.search.trim().toLowerCase())
      );
      setInfo(result);
    }

    if (
      (!object.search && !object.relation && object.working)
    ) {
      const result = listCopy.filter((v) =>
        v.work.trim().toLowerCase().includes(object.working.trim().toLowerCase())
      );
      setInfo(result);
    }

    // setLoading(false);

  };

  const resetForm = () => {
    setName('');
    setWorking('');
    setValue('');
    searchValue()
  }

  useEffect(() => {
    setTimeout(() => {
      setNotification(false);
    }, 9000);
  });

  const closeDialog = (isShowForm: boolean) => {
    setShowForm(isShowForm);
  };

  const closeToast = (isShowDialog: boolean) => {
    setNotification(isShowDialog)
    setIsShowDialog(isShowDialog);
  };

  const showCreate = (isShowDialog: boolean) => {
    setShowForm(isShowDialog);
    setAction('create');
  };

  const isFilterSearch = (isShowDialog: boolean) => {
    setIsFilterSearch(isShowDialog);
  }

  const showDialog = (value: string) => {
    if (value.includes('cancel')) {
      setIsShowDialog(false);
      return;
    }

    if (infomation) {
      const newRows = rows.filter((v) => v !== infomation!.row);

      setInfo(newRows);
      const copy = listCopy.filter((v) => v !== infomation!.row);
      setListCopy(copy);
    } else {
      const finalRows = listSelection.reduce((acc, v) => {
        return acc.filter((e: any) => e !== v[0]);
      }, rows);
      setInfo(finalRows);
      const copy = listSelection.reduce((acc, v) => {
        return acc.filter((e: any) => e !== v[0]);
      }, listCopy);

      setListCopy(copy);
    }
    setNotification(true);
    setType('success');
    setIsShowDialog(false);
  };

  function selectedRows(value: any) {
    setSelection(value.ids);
  }

  const removeSelection = () => {
    const arr = new Set(selection);
    const list: any[] = [];
    if (arr.size) {
      arr.forEach((v) => {
        const element = rows.filter((e) => e.id == v);
        list.push(element);
        setListSelection(list);
        setIsShowDialog(true);
        setSelectionBoolean(false);
        getInformation(null);
      });
    } else {
      setIsShowDialog(true);
      setSelectionBoolean(true);
    }
  };
  const [value, setValue] = useState(listOptions[0]);
  return (
    <>
    <ProminentAppBar showSearch={true} isFilterSearch={isFilterSearch} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <ChildComponent
          closeDialog={closeDialog}
          isShowForm={isShowForm}
          action={action}
          info={info}
          dataFlow={handleSubmitChild}
        />

        <AlertComponent
          closeToast={closeToast}
          type={type}
          notification={notification}
          message={message}
        />

        <DialogComponent
          selection={selectionBooolean}
          showDialog={showDialog}
          isShowDialog={isShowDialog}
        />
      </div>
      { isFilterSearchForm ? (
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
            <Box sx={{ width: 350, maxWidth: '100%' }}>
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
            <Box sx={{ width: 350, maxWidth: '100%' }}>
              <TextField
                size="small"
                type="text"
                value={working}
                onChange={(e) => setWorking(e.target.value)}
                fullWidth
                label="Nơi làm việc"
                id="fullWidth"
              />
            </Box>
            <Box sx={{ width: 350, maxWidth: '100%' }}>
              <Autocomplete
                value={value}
                size="small"
                onChange={(event: any, newValue: string | null) => {
                  setValue(newValue);
                }}
                id="controllable-states-demo"
                options={listOptions}
                renderInput={(params) => (
                  <TextField {...params} label="Tình trạng hôn nhân" />
                )}
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
              color='error'
              onClick={() => {
                resetForm();
              }}
              endIcon={<RestartAltIcon />}
            >
              Reset
            </Button>
          </div>
        </AccordionDetails>
      </Accordion> ) : (<div></div>)
}
      <div className="table-container">
        <div className="flex">
          <Button
            variant="contained"
            color="error"
            onClick={removeSelection}
            endIcon={<DeleteIcon />}
          >
            Xóa nhiều
          </Button>
        </div>
      </div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          onRowSelectionModelChange={(value) => {
            selectedRows(value);
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          rowSelection
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          // loading={loading}
        />
      </Box>
      <BottomAppBar showCreate={true} isShowForm={showCreate} />
    </>
  );
}

function transformText(value: string): string {
  switch (value) {
    case 'alone':
      return 'Độc thân';
    case 'family':
      return 'Đã có gia đình';
    case 'in-relationship':
      return 'Đang hẹn hò';
    case 'Độc thân':
      return 'alone';
    case 'Đang hẹn hò':
      return 'in-relationship';
    case 'Đã có gia đình':
      return 'family';
    default:
      return value || 'Không có dữ liệu';
  }
}

export default Test;
