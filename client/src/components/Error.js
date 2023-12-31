import React from "react";
import { useContext, useState, useEffect } from "react";
import { ErrorContext } from "../context/errorContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Error() {
  const { errors, saveErrors } = useContext(ErrorContext);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (errors) {
      setOpen(true);
      const timer = setTimeout(() => {
        saveErrors(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [errors, saveErrors]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ horizontal: "left", vertical: "top" }}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errors}
      </Alert>
    </Snackbar>
  );
}
export default Error;
