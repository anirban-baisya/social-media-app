import { Box, Stack } from '@mui/material';
import { useState } from "react";
import MuiNavbar from '../components/MuiNavbar';
import NewsFeed from '../components/NewsFeed';
import Rightbar from '../components/Rightbar';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
    const [mode, setMode] = useState("light");

  return (
    <>
     <Box bgcolor={"background.default"} color={"text.primary"}>
        <MuiNavbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
          <NewsFeed />
          <Rightbar />
        </Stack>
      </Box>
    </>
  )
}
