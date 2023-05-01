import { Box, Stack } from '@mui/material';
import { useState } from "react";
import MuiNavbar from '../components/MuiNavbar';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Rightbar from '../components/Rightbar';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
    const [mode, setMode] = useState("light");

  return (
    <>
     <Box bgcolor={"background.default"} color={"text.primary"}>
        <MuiNavbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
          {/* <CreatePost /> */}
          <Feed />
          <Rightbar />
        </Stack>
        {/* <Add /> */}
      </Box>
      {/* <ToastContainer /> */}
    </>
  )
}
