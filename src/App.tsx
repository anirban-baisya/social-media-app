

import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import MuiNavbar from "./components/MuiNavbar";
import Add from "./components/Add";
import { useState } from "react";
import CreatePost from "./components/CreatePost";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";
 import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [mode, setMode] = useState("light");

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: mode,
  //   },
  // });
  return (
    // <ThemeProvider theme={darkTheme}>
      // <Box bgcolor={"background.default"} color={"text.primary"}>
      //   <MuiNavbar />
      //   <Stack direction="row" spacing={2} justifyContent="space-between">
      //   <Sidebar setMode={setMode} mode={mode}/>
      //     {/* <CreatePost /> */}
      //     <Feed />
      //     <Rightbar />
      //   </Stack>
      //   {/* <Add /> */}
      // </Box>
      <>
      <RouterProvider router={router} />
      <ToastContainer />
      </>
    // </ThemeProvider>
  );
}

export default App;

