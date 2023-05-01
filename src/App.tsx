

import { useState } from "react";

import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from "./routes/AppRoutes";

function App() {
  const [mode, setMode] = useState("light");

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: mode,
  //   },
  // });
  return (
    // <ThemeProvider theme={darkTheme}>
   
      <>
      <RouterProvider router={router} />
      <ToastContainer />
      </>
    // </ThemeProvider>
  );
}

export default App;

