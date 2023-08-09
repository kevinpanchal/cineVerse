// Author - Roshil Ka Patel (B00917345)

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import CustomButton from "../UI/CustomButton";
import { useDispatch } from "react-redux";
import { addFoodItemAction, updateFoodItemAction } from "../../store/FoodAndBeverages/actions";
import CustomSpinner from "../../components/UI/CustomSpinner";

const Type = ["Combo", "Food", "Beverage"];
const data = {
  name: "",
  description: "",
  type: "",
  price: "",
  image: "",
};

const FoodModal = ({ open, onClose, loading, updateItem, setUpdateItem }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(updateItem ? updateItem : { ...data });
  const [errors, setErrors] = useState({ ...data });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const isDataValid = () => {
    let valid = true;
    const error = { ...data };

    if (!formData.name) {
      valid = false;
      error.name = "Please enter valid name.";
    }
    if (formData.description.trim().length < 1) {
      valid = false;
      error.name = "Please enter a valid name.";
    }

    if (!formData.description) {
      valid = false;
      error.description = "Please enter valid description";
    }

    if (!formData.price) {
      valid = false;
      error.price = "Price is required.";
    }

    if (formData.price < 0) {
      valid = false;
      error.price = "Please enter valid price more than 0";
    }

    if (!formData.type) {
      valid = false;
      error.type = "Please select a valid type.";
    }
    if (!updateItem) {
      if (!image) {
        valid = false;
        error.image = "Please select valid image.";
      }
    }

    setErrors(error);
    return valid;
  };

  const handleSave = () => {
    if (isDataValid()) {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("description", formData.description);
      if (image) fd.append("file", image);
      if (updateItem) fd.append("id", updateItem._id);
      fd.append("price", formData.price);
      fd.append("category", formData.type.toLowerCase());
      if (updateItem) {
        dispatch(
          updateFoodItemAction(fd, () => {
            handleCancel();
          })
        );
      } else {
        dispatch(addFoodItemAction(fd, () => handleCancel()));
      }
    }
  };

  const handleCancel = () => {
    setFormData({ ...data });
    setErrors({});
    setImage(null);
    setUpdateItem(null);
    onClose();
  };

  useEffect(() => {
    if (updateItem)
      setFormData({
        name: updateItem.name,
        description: updateItem.description,
        type: updateItem.category.charAt(0).toUpperCase() + updateItem.category.slice(1),
        price: updateItem.price.toString(),
        image: updateItem.imageUrl,
      });
  }, [updateItem]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h2">
        {updateItem ? "Update Food or Beverage Item" : "Add Food or Beverage Item"}
      </DialogTitle>
      <DialogContent>
        <TextField
          disabled={loading}
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.price}
          helperText={errors.price}
          disabled={loading}
        />
        <FormControl fullWidth margin="normal" error={!!errors.type} disabled={loading}>
          <InputLabel>Type</InputLabel>
          <Select label="languages" name="type" value={formData.type} onChange={handleChange}>
            {Type.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
          {errors.type && (
            <span
              style={{
                marginTop: "3px",
                marginLeft: "14px",
                marginRight: "14px",
                fontSize: "0.75rem",
                color: "#d32f2f",
              }}>
              {errors.type}
            </span>
          )}
        </FormControl>

        <TextField
          label="Description"
          disabled={loading}
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description}
        />
        {updateItem ? (
          <>
            <div>
              <Typography variant="body1" sx={{ marginTop: "10px", marginBottom: "10px" }}>
                Uploaded Image
              </Typography>
              <img
                src={image ? URL.createObjectURL(image) : formData.image}
                alt="Uploaded"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <CustomButton
              variant="contained"
              component="label"
              sx={{ marginTop: "15px" }}
              disabled={loading}>
              Change Image
              <input
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
                type="file"
              />
            </CustomButton>
          </>
        ) : (
          <>
            {image && (
              <div>
                <Typography variant="body1" sx={{ marginTop: "10px", marginBottom: "10px" }}>
                  Uploaded Image
                </Typography>
                <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: "100%" }} />
              </div>
            )}
            <CustomButton
              variant="contained"
              component="label"
              sx={{ marginTop: "15px" }}
              disabled={loading}>
              {image ? "Change Image" : "Upload Image"}
              <input
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
                type="file"
              />
            </CustomButton>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {loading ? (
          <CustomSpinner />
        ) : (
          <>
            <CustomButton onClick={handleSave} variant="contained" color="secondary">
              {updateItem ? "Update" : "Save"}
            </CustomButton>
            <CustomButton onClick={handleCancel} variant="outlined" color="secondary">
              Cancel
            </CustomButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default FoodModal;
