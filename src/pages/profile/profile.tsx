import Avatar from "@mui/material/Avatar";
import BottomAppBar from "../../component/appbottom/bottom";
import ProminentAppBar from "../../component/apptop/top";
import "./profile.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import VerticalTabs from "../../component/tab/tab";
import { useState } from "react";
import {
  decrement,
  increment,
  incrementBy,
} from "../../redux/store/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";

function Profile() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  const [listLabel] = useState(["Thong tin ca nhan", "dia chi"]);
  return (
    <>
      <ProminentAppBar showSearch={false} />
      <div>
        <Card
          sx={{
            maxWidth: 488,
            overflow: "visible",
            margin: "10px 0px",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <CardMedia
            component="img"
            alt="User's profile background"
            height="140"
            image="src/assets/react.svg"
            sx={{ borderRadius: 2 }}
          />
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{
                bgcolor: "blue",
                position: "absolute",
                top: "-30px",
                left: "15px",
                width: 70,
                height: 70,
                border: "2px solid white",
              }}
            >
              CN
            </Avatar>
          </Box>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Frontend Developer
            </Typography>

            <VerticalTabs listLabel={listLabel} />

            <div style={{ padding: 20 }}>
              <h1>{count}</h1>

              <button onClick={() => dispatch(increment())}>+</button>
              <button
                style={{ marginLeft: 8 }}
                onClick={() => dispatch(decrement())}
              >
                -
              </button>
              <button
                style={{ marginLeft: 8 }}
                onClick={() => dispatch(incrementBy(5))}
              >
                +5
              </button>
            </div>
          </Box>
        </Card>
      </div>
      <BottomAppBar showCreate={false} />
    </>
  );
}

export default Profile;
