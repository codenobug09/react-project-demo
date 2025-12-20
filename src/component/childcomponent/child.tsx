import { useEffect, useState } from "react";
import "./child.css";
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function ChildComponent({
  isShowForm,
  dataFlow,
  info,
  isShowCustom,
  action,
  closeDialog,
  listConfigField,
  isFixName
}: {
  isFixName: boolean;
  isShowForm: boolean;
  dataFlow: Function;
  closeDialog: Function;
  info: any;
  action: string;
  listConfigField: any[]
  isShowCustom: boolean;
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [live, setLive] = useState("");
  const [work, setWork] = useState("");

  const [fixAge, setfixAge] = useState<number>();
  function closeForm(e: any) {
    e.preventDefault();
    setName("");
    setAge("");
    setLive("");
    setValue("");
    setWork("");
    closeDialog(false);
  }

  function handleSubmit(e: any) {
    if(isFixName) {
    e.preventDefault();
    const payload = {
      id: action.includes("create") ? "TCI" + `${Math.random()}` : info.id,
      name: name,
      age: age,
      live: live,
      work: work,
      relationship: transformTextTo(value)
    };
    if (name && age && live && work && value) {
      dataFlow(payload);
      closeForm(e);
    }
    else {
      if (isShowCustom) {
        dataFlow({
          id: ''
        });
      }
      else {
        dataFlow(formData)
      }
    }
  }
  else {
    const payload = {
      age: fixAge
    }
    dataFlow(payload)
    closeForm(e);
  }
  }

  useEffect(() => {
    if ((info && action.includes("update")) || action.includes("detail")) {
      setName(info.row.name);
      setAge(info.row.age);
      setLive(info.row.live);
      setValue(transformTextTo(info.row.relationship));
      setWork(info.row.work);
    }
  }, [info]);

  const initialFormData = listConfigField.reduce((acc, cur) => {
    acc[cur.field] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (field: any) => (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: e.target.value
    }));
  };



  const listOptions = ["Độc thân", "Đã có gia đình", "Đang hẹn hò"];

  const [value, setValue] = React.useState<string | null>(listOptions[0]);

  return (
    <>
      <React.Fragment>
        <BootstrapDialog
          onClose={closeForm}
          aria-labelledby="customized-dialog-title"
          open={isShowForm}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {isFixName ? tranformText(action) : 'Xin chào'}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={closeForm}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div className="form-container">
              <form className="form-container" onSubmit={handleSubmit}>
               
                {
                  isShowCustom ? (
                    <>
                      {
                        isFixName ? (
                        <>
                      <Box sx={{ width: 300, maxWidth: "100%" }}>
                        <TextField
                          size="small"
                          type="text"
                          fullWidth
                          onChange={(e) => setName(e.target.value)}
                          label="Name"
                          value={action.includes("detail") ? info.row.name : name}
                          disabled={action.includes("detail")}
                          id="fullWidth"
                        />
                      </Box>
                      <br />

                      <Box sx={{ width: 300, maxWidth: "100%" }}>
                        <TextField
                          size="small"
                          type="number"
                          fullWidth
                          onChange={(e) => setAge(Number(e.target.value))}
                          label="Age"
                          value={action.includes("detail") ? info.row.age : age}
                          disabled={action.includes("detail")}
                          id="fullWidth"
                        />
                      </Box>
                      <br />

                      <Box sx={{ width: 300, maxWidth: "100%" }}>
                        <TextField
                          size="small"
                          type="text"
                          fullWidth
                          onChange={(e) => setLive(e.target.value)}
                          label="Live"
                          value={action.includes("detail") ? info.row.live : live}
                          disabled={action.includes("detail")}
                          id="fullWidth"
                        />
                      </Box>
                      <br />

                      <Box sx={{ width: 300, maxWidth: "100%" }}>
                        <TextField
                          size="small"
                          type="text"
                          fullWidth
                          onChange={(e) => setWork(e.target.value)}
                          label="work"
                          value={action.includes("detail") ? info.row.work : work}
                          disabled={action.includes("detail")}
                          id="fullWidth"
                        />
                      </Box>

                      <br />

                      <Box sx={{ width: 300, maxWidth: "100%" }}>
                        <Autocomplete
                          value={value}
                          size="small"
                          onChange={(event: any, newValue: string | null) => {
                            if (action.includes("detail")) {
                              setValue(info.row.relationship);
                            } else {
                              setValue(newValue);
                            }
                          }}
                          disabled={action.includes("detail")}
                          id="controllable-states-demo"
                          options={listOptions}
                          renderInput={(params) => (
                            <TextField {...params} label="Tình trạng hôn nhân" />
                          )}
                        />
                      </Box>
                      <br />
                      </> ) : (
                        <Box sx={{ width: 300, maxWidth: "100%" }}>
                        <TextField
                          size="small"
                          type="number"
                          fullWidth
                          onChange={(e) => setfixAge(Number(e.target.value))
                          }
                          label="age"
                          value={fixAge}
                          disabled={action.includes("detail")}
                          id="fullWidth"
                        />
                      </Box>
                      )
                      } 
                      </>) : (

                    listConfigField.map(v => (
                      <>
                        <Box key={v.field} sx={{ width: 300, maxWidth: "100%" }}>
                          <TextField
                            size="small"
                            type={v.type}
                            fullWidth
                            label={v.label}
                            value={
                              action.includes("detail")
                                ? info?.row?.[v.field] ?? ''
                                : formData[v.field]
                            }
                            onChange={handleChange(v.field)}
                            disabled={action.includes("detail")}
                          />
                        </Box>
                        <br />
                        {/* <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}

                        >
                          Upload files
                          <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => {setImage(event.target.files)
                            }}
                            multiple
                          />
                        </Button> */}

                        {/* <img src={}></img> */}
                      </>
                    )))
                }

              </form>
            </div>
          </DialogContent>
          <DialogActions>
            {action.includes("detail") ? (
              <div></div>
            ) : (
              <Button autoFocus onClick={handleSubmit}>
                {action.includes("update") || !isFixName ? "Cập nhật" : "Tạo mới"}
              </Button>
            )}
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    </>
  );
}

function tranformText(value: string): string {
  switch (value) {
    case "create":
      return "Thêm mới";
    case "update":
      return "Cập nhật";
    case "detail":
      return "Chi tiết";
    default:
      return "";
  }
}

function transformTextTo(value: string): string {
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

export default ChildComponent;
