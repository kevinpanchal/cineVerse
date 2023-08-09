import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const TheatreModal = ({ open, onClose, isUpdate, theatreData, onSubmit }) => {
  const defaultTheatreData = {
    name: "",
  };

  const [formData, setFormData] = React.useState({ ...defaultTheatreData });
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    if (isUpdate) setFormData({ ...theatreData });
  }, [theatreData, isUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const requiredFields = ["name"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
    setFormData({ ...defaultTheatreData });
    setErrors({});
    onClose();
  };

  const handleCancel = () => {
    setFormData({ ...defaultTheatreData });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isUpdate ? "Update Theatre" : "Create Theatre"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={handleCancel} variant="outlined" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TheatreModal;
