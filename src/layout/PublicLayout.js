import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

import AlertMsg from "../features/AlertMsg";
import PublicNavbar from "../features/PublicNavbar";

const PublicLayout = () => {
  return (
    <Stack minHeight="100vh" alignItems="center">
      <AlertMsg />
      <PublicNavbar />
      <Outlet />
    </Stack>
  );
};

export default PublicLayout;
