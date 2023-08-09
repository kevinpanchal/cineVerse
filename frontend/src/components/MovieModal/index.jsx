import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";

const MovieModal = ({ open, onClose, isUpdate, movieData, onSubmit }) => {
  const defaultMovieData = {
    name: "",
    duration: "",
    languages: [],
    releaseDate: new Date().toISOString().slice(0, 10),
    description: "",
    genre: "",
    image: "",
  };

  const [formData, setFormData] = React.useState({ ...defaultMovieData });
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    if (isUpdate) {
      setFormData({
        ...movieData,
        releaseDate: new Date(movieData?.releaseDate).toISOString().slice(0, 10),
      });
    }
  }, [movieData, isUpdate]);

  const Languages = ["English", "Spanish", "French", "German", "Chinese"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const requiredFields = [
      "name",
      "duration",
      "languages",
      "releaseDate",
      "description",
      "genre",
      "image",
    ];
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
    setFormData({ ...defaultMovieData });
    setErrors({});
    onClose();
  };

  const handleCancel = () => {
    setFormData({ ...defaultMovieData });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h2">{isUpdate ? "Update Movie" : "Create Movie"}</DialogTitle>
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
        <TextField
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.duration}
          helperText={errors.duration}
        />
        <FormControl fullWidth margin="normal" error={!!errors.languages}>
          <InputLabel>Languages</InputLabel>
          <Select
            label="languages"
            name="languages"
            multiple
            value={formData.languages || []}
            onChange={handleChange}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}>
            {Languages.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
          {errors.languages && <span>{errors.languages}</span>}
        </FormControl>
        <TextField
          label="Release Date"
          name="releaseDate"
          type="date"
          value={formData.releaseDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.releaseDate}
          helperText={errors.releaseDate}
        />
        <TextField
          label="Description"
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
        <TextField
          label="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.genre}
          helperText={errors.genre}
        />
        <TextField
          label="Image"
          name="image"
          value={formData.image}
          type="url"
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.duration}
          helperText={errors.duration}
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

export default MovieModal;
