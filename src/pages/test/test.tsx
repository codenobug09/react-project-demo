import React, { useEffect, useState } from "react";
import AlertComponent from "../../component/alertcomponent/alert.tsx";
import ChildComponent from "../../component/childcomponent/child.tsx";
import "./test.css";
import DialogComponent from "../../component/dialogcomponent/dialog.tsx";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { GridColDef } from "@mui/x-data-grid/models/colDef";
import Box from "@mui/material/Box";
import { DataGrid, GridArrowDownwardIcon } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import BottomAppBar from "../../component/appbottom/bottom.tsx";
import ProminentAppBar from "../../component/apptop/top.tsx";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store.ts";
import { copyData, removeData } from "../../redux/store/copySave.tsx";

function Test() {
  const [field, setField] = useState('');
  const [isShowForm, setShowForm] = useState(false);
  const [info, getInfo] = useState("");
  const [action, setAction] = useState("");
  const [search, setName] = useState("");
  const [type, setType] = useState<"success" | "info" | "warning" | "error">("success");
  const [selection, setSelection] = useState([]);
  const [listSelection, setListSelection] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [isFilterSearchForm, setIsFilterSearch] = useState(false);
  const [copy, setCopy] = useState<any[]>([]);
  const [working, setWorking] = useState("");
  const [notification, setNotification] = useState(false);
  const [infomation, getInformation] = useState({});
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [selectionBooolean, setSelectionBoolean] = useState(false);
  const [fixName, setFixName] = useState(false);
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });
  // const [loading, setLoading] = useState(false);
  const count = useSelector((state: RootState) => state.cache.value);
  const dispatch = useDispatch<AppDispatch>();
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "index",
      headerName: "STT",
      width: 90,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "name",
      headerName: "Tên",
      width: 150,
    },
    {
      field: "age",
      headerName: "Tuổi",
      width: 150,
    },
    {
      field: "live",
      headerName: "Nơi sống",
      width: 110,
    },
    {
      field: "work",
      headerName: "Làm việc",
      width: 110,
    },
    {
      field: "relationship",
      headerName: "Tình trạng hôn nhân",
      description: "This column has a value getter and is not sortable.",
      width: 160,
      valueGetter: (value: any, row: any) =>
        `${transformText(value) || transformText(row.relationship)}`,
    },
    {
      field: "createdAt",
      headerName: "Thời gian tạo",
      width: 110,
    },
    {
      field: "updatedAt",
      headerName: "Thời gian cập nhật",
      width: 110,
    },
    {
      field: "actions",
      headerName: "Hành động",
      description: "This column has list actions",
      sortable: false,
      disableColumnMenu: true,
      width: 160,
      renderCell: (params) => (
        <>
          <div className="action-btn">
            {
              <Tooltip title="Sửa">
                <IconButton>
                  <BorderColorIcon
                    color={"action"}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleRowClick(params, "update");
                      setShowForm(true);
                      setFixName(true);
                    }}
                  />
                </IconButton>
              </Tooltip>
            }
            {
              <Tooltip title="Xem">
                <IconButton>
                  <VisibilityIcon
                    color={"info"}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleRowClick(params, "detail");
                      setShowForm(true);
                      setFixName(true);
                    }}
                  />
                </IconButton>
              </Tooltip>
            }
            {
              <Tooltip title="Xóa">
                <IconButton>
                  <DeleteIcon
                    color={"error"}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      fixName
                      deleteRow(params);
                      setSelectionBoolean(false);
                      setFixName(true);
                    }}
                  />
                </IconButton>
              </Tooltip>
            }
          </div>
        </>
      ),
    },
  ];
  
  const updateColor = () => {
    setCar(previousState => {
      return { ...previousState, color: "blue" }
    });
  }

  const [rows, setInfo] = useState([
    {
      id: "TCI1",
      name: "Nguyen Minh Chau",
      age: 22,
      live: "Ha Noi",
      work: "Thu cuc TCI",
      createdAt: "15:3-17/11/2025",
      updatedAt: "15:3-17/11/2025",
      relationship: "alone",
    },
    {
      id: "TCI2",
      name: "Nguyen Minh Tin",
      age: 30,
      live: "Ha Noi",
      work: "Thu cuc TCI",
      createdAt: "15:3-17/11/2025",
      updatedAt: "15:3-17/11/2025",
      relationship: "alone",
    },
    {
      id: "TCI3",
      name: "Nguyen Tan",
      age: 33,
      live: "Ha Noi",
      work: "Thu cuc TCI",
      createdAt: "15:3-17/11/2025",
      updatedAt: "15:3-17/11/2025",
      relationship: "family",
    },
    {
      id: "TCI4",
      name: "Nguyen Thach Thao",
      age: 20,
      live: "Ha Noi",
      work: "Thu cuc TCI",
      createdAt: "15:3-17/11/2025",
      updatedAt: "15:3-17/11/2025",
      relationship: "in-relationship",
    },
    {
      id: "TCI5",
      name: "Tran Hai Nam",
      age: 20,
      live: "Ha Noi",
      work: "Thu cuc TCI",
      createdAt: "15:3-17/11/2025",
      updatedAt: "15:3-17/11/2025",
      relationship: "",
    },
  ]);

  const listOptions = ["Độc thân", "Đã có gia đình", "Đang hẹn hò"];

  const [listCopy, setListCopy] = useState<any[]>(rows);

  const handleSubmitChild = (formData: any) => {
    if(fixName){
    const day = new Date();
    if (action.includes("create")) {
      if (formData.name) {
        const element = rows.filter(e => e.name.includes(formData.name))
        if (element.length) {
          setType("error");
          setIsShowDialog(false);
          setMessage("Không được trùng tên! Thêm mới thất bại");
          setNotification(true);
        }
        else {
          const payload = {
            ...formData,
            createdAt: day.getHours()+':'+day.getMinutes()+'-'+day.getDate()+'/'+day.getMonth()+'/'+day.getFullYear()
          }
          setInfo([...rows, payload]);
          setListCopy(listCopy.concat(payload));
          setNotification(true);
          setMessage("Thêm mới thanh cong");
          setType("success");
          setIsShowDialog(false);
        }

      }
      else {
        setMessage("Không được để trống các trường! Thêm mới thất bại");
        setNotification(true);
        setType("error");
        setIsShowDialog(false);
      }
    } else {
      if (formData?.name) {
        const element = rows.filter(e => (e.name == formData?.name))
        if (!element.length) {
          rows.map((e: any) => {
          if(e.id == formData.id){
          const payload = {
            ...formData,
            createdAt: e?.createdAt,
            updatedAt: day.getHours()+':'+day.getMinutes()+'-'+day.getDate()+'/'+day.getMonth()+'/'+day.getFullYear()
          }
          const updatedRows = rows.map((v) =>
            v.id === formData.id ? payload : v
          );
          const updateCopy = listCopy.map((v) =>
            v.id === formData.id ? payload : v
          );
          setMessage("");
          setInfo(updatedRows);
          setListCopy(updateCopy);
          setNotification(true);
          setType("success");
          setIsShowDialog(false);}})
        }
        else {
          setType("error");
          setIsShowDialog(false);
          setMessage("Không được trùng tên! Cap nhat thất bại");
          setNotification(true);
        }
      }
      else {
        setType("error");
        setIsShowDialog(false);
        setMessage("Không được để trống các trường! Cap nhat thất bại");
        setNotification(true);
      }
    }
    }
    else {
      listSelection.map(v => v.age = formData.age);
      setNotification(true);
      setMessage("Sửa thành công !");
      setType("success");
    }
  };

  const handleRowClick = (information: any, action: any) => {
    getInfo(information);
    if (action.includes("update")) {
      setAction("update");
    } else {
      setAction("detail");
    }
  };

  const deleteRow = (information: any) => {
    setIsShowDialog(true);
    setMessage("Xoa thanh cong!");

    getInformation(information);
  };

  const searchValue = () => {
    const object = {
      search: search,
      relation: value,
      working: working,
    };

    if (object) {
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

    if (object.search && !object.relation) {
      const result = listCopy.filter(
        (v) =>
          v.name
            .trim()
            .toLowerCase()
            .includes(object.search.trim().toLowerCase()) &&
          v.work
            .trim()
            .toLowerCase()
            .includes(transformText(object.working).trim().toLowerCase())
      );
      setInfo(result);
    }

    if (object.search && !object.working) {
      const result = listCopy.filter(
        (v) =>
          v.name
            .trim()
            .toLowerCase()
            .includes(object.search.trim().toLowerCase()) &&
          v.relationship
            .trim()
            .toLowerCase()
            .includes(transformText(object.relation).trim().toLowerCase())
      );
      setInfo(result);
    }

    if (object.relation && object.working) {
      const result = listCopy.filter(
        (v) =>
          v.work
            .trim()
            .toLowerCase()
            .includes(object.working.trim().toLowerCase()) &&
          v.relationship
            .trim()
            .toLowerCase()
            .includes(transformText(object.relation).trim().toLowerCase())
      );
      setInfo(result);
    }

    if (object.search && !object.relation && !object.working) {
      const result = listCopy.filter((v) =>
        v.name.trim().toLowerCase().includes(object.search.trim().toLowerCase())
      );
      setInfo(result);
    }

    if (!object.search && !object.relation && object.working) {
      const result = listCopy.filter((v) =>
        v.work
          .trim()
          .toLowerCase()
          .includes(object.working.trim().toLowerCase())
      );
      setInfo(result);
    }

  };

  const resetForm = () => {
    setName("");
    setWorking("");
    setValue("");
    searchValue();
  };

  useEffect(() => {
    setTimeout(() => {
      setNotification(false);

    }, 9000);
  });

  const closeDialog = (isShowForm: boolean) => {
    setShowForm(isShowForm);
  };

  const closeToast = (isShowDialog: boolean) => {
    setNotification(isShowDialog);
    setIsShowDialog(isShowDialog);
  };

  const showCreate = (isShowDialog: boolean) => {
    setFixName(true)
    setShowForm(isShowDialog);
    setAction("create");
  };

  const isFilterSearch = (isShowDialog: boolean) => {
    setIsFilterSearch(isShowDialog);
  };

  const showDialog = (value: string) => {
    if (value.includes("cancel")) {
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
    
    if (field == '__check__') {
      setInfo([])
    }


    setNotification(true);
    setType("success");
    setIsShowDialog(false);
  };

  function selectedRows(value: any) {
    setSelection(value.ids);
  }

  const removeSelection = () => {
    const arr = new Set(selection);
    setFixName(true);
    const list: any[] = [];
    if (arr.size) {
      arr.forEach((v) => {
        const element = rows.filter((e) => e.id == v);
        list.push(element);
        setListSelection(list);
        setIsShowDialog(true);
        setSelectionBoolean(false);
        getInformation({});
      });
    } else {
      setIsShowDialog(true);
      setSelectionBoolean(true);
    }
  };

  const removeAll = () => {
    setFixName(true)
    if(listSelection.length){
    setIsShowDialog(true);
    }
  }

  const copySelection = () => {
    const arr = new Set(selection);
    const list: any[] = [];
    if (arr.size) {
      arr.forEach((v) => {
        const element = rows.filter((e) => e.id == v);
        // list.push(element.map((e) => e.name));
        list.push(element[0]);

        setListSelection(list);
        setCopy(listSelection);
        dispatch(copyData(copy[0]));
      });
    } else {
      setIsShowDialog(true);
      setSelectionBoolean(true);
    }
  };

  const copySelection2 = () => {
    const arr = new Set(selection);
    setFixName(false);
    const list: any[] = [];
    setShowForm(true)
    if (arr.size) {
      arr.forEach((v) => {
        const element = rows.filter((e) => e.id == v);
        list.push(element[0]);
        setListSelection(list);
        setCopy(listSelection);
        
      });
    }
  };

  const [value, setValue] = useState(listOptions[0]);
  return (
    <>
      <ProminentAppBar showSearch={true} isFilterSearch={isFilterSearch} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <ChildComponent
          isFixName={fixName}
          isShowCustom={true}
          closeDialog={closeDialog}
          isShowForm={isShowForm}
          action={action}
          listConfigField={[]}
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
              <Box sx={{ width: 350, maxWidth: "100%" }}>
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
              <Box sx={{ width: 350, maxWidth: "100%" }}>
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
              <Box sx={{ width: 350, maxWidth: "100%" }}>
                <Autocomplete
                  value={value}
                  size="small"
                  onChange={(event: any, newValue: any) => {
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
          <Button
            variant="contained"
            color="error"
            onClick={removeAll}
            endIcon={<DeleteIcon />}
          >
            Xóa tất cả
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={copySelection}
            endIcon={<ContentCopyIcon />}
          >
            Copy
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={copySelection2}
            endIcon={<BorderColorIcon />}
          >
            Sửa nhiều
          </Button>
        </div>
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          onRowSelectionModelChange={(value) => {
            selectedRows(value);
          }}
          onColumnHeaderClick={(value) => {
            if(value?.field == '__check__'){
              setListSelection(rows);
              setField('__check__')
            }
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
        />
      </Box>
      <BottomAppBar showCreate={true} isShowForm={showCreate} />
    </>
  );
}

function transformText(value: string): string {
  switch (value) {
    case "alone":
      return "Độc thân";
    case "family":
      return "Đã có gia đình";
    case "in-relationship":
      return "Đang hẹn hò";
    case "Độc thân":
      return "alone";
    case "Đang hẹn hò":
      return "in-relationship";
    case "Đã có gia đình":
      return "family";
    default:
      return value || "Không có dữ liệu";
  }
}

export default Test;
