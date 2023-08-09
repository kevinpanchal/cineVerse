// Author - Vaidik Anilbhai Nimavat (B00925420)

import React, { useState, useEffect } from "react";
import { Button, Grid, Avatar, Card, Typography, FormControl, TextField, Box } from "@mui/material";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const UserProfile = () => {
  const { user } = useSelector((state) => state.authReducer);
  const token = Cookies.get("token");

  const userId = user.email;
  const styles = {
    box: {
      "&.MuiBox-root": {
        padding: "2rem 0",
        paddingTop: "0",
      },
    },
    titleBar: {
      width: "100%",
    },
    gridContainer: {
      height: "100%",
    },
  };

  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    dob: "",
    imageUrl: "",
    phoneNo: "",
    country: "",
    unit: "",
    street: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editProfilePic, setEditProfilePic] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        getUserProfile(userId).then((res) => {
          setState(res.data.user);
        });
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setState({
      ...state,
      imageUrl: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const enableEditMode = (event) => {
    event.preventDefault();
    setEditMode(true);
    setEditProfilePic(true);
  };

  const saveProfileHandler = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      updateUserProfile(state._id, state).then((res) => {
        setState(res.data.user);
        setEditMode(false);
        setEditProfilePic(false);
        setErrors({});
      });
    } catch (error) {
      console.error("Error updating user profile", error);
    }
  };

  const updateUserProfile = async (id, userData) => {
    try {
      const formData = new FormData();
      formData.append("file", state.file);
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phoneNo", userData.phoneNo);
      formData.append("unit", userData.unit);
      formData.append("street", userData.street);
      formData.append("city", userData.city);
      formData.append("provice", userData.province);
      formData.append("country", userData.country);
      formData.append("postalCode", userData.postalCode);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/user/${id}/updateuserinfo`,
        formData,
        { headers: { Authorization: "Bearer " + token, "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update user profile");
    }
  };

  const getUserProfile = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/user/${id}/getuserinfo`,
        { headers: { Authorization: "Bearer " + token } }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get user profile");
    }
  };

  const validateForm = () => {
    const regex = /^[a-zA-Z ]*$/;
    const countryRegex = /^[a-zA-Z ]*$/;
    const provinceRegex = /^[a-zA-Z ]*$/;
    const cityRegex = /^[a-zA-Z ]*$/;
    const phoneRegex = /^\d+$/;
    const validationErrors = {};

    if (!state.name.trim().match(regex)) {
      validationErrors.name = "Name can only contain letters and spaces";
    }

    if (!state.country.trim().match(countryRegex)) {
      validationErrors.country = "Country can only contain letters and spaces";
    }

    if (!state.province.trim().match(provinceRegex)) {
      validationErrors.province = "Province can only contain letters and spaces";
    }

    if (!state.city.trim().match(cityRegex)) {
      validationErrors.city = "City can only contain letters and spaces";
    }

    if (state.phoneNo.trim() !== "" && !state.phoneNo.trim().match(phoneRegex)) {
      validationErrors.phoneNo = "Phone number can only contain digits";
    }

    return validationErrors;
  };

  return (
    <Grid
      container
      spacing={3}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}>
      <div style={styles.titleBar}>
        <Box sx={styles.box}>
          <Typography variant="h1" color="darkBlue" textAlign="center">
            User Profile
          </Typography>
        </Box>
      </div>

      <div
        style={{
          display: "block",
          width: 400,
          paddingLeft: 30,
        }}></div>
      <Card
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "80vw",
          marginBottom: "2rem",
        }}>
        {editProfilePic ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}>
            <Avatar
              src={state?.imageUrl}
              style={{ width: "200px", height: "200px", margin: "10px 0" }}
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="profile-pic-upload"
              type="file"
              name="imageUrl"
              onChange={handleImageChange}
            />
            <label htmlFor="profile-pic-upload">
              <Button component="span" variant="contained" color="primary">
                Upload Profile Picture
              </Button>
            </label>
          </div>
        ) : (
          <Avatar
            src={state?.imageUrl}
            style={{ width: "200px", height: "200px", margin: "10px 0" }}
          />
        )}
        <Typography variant="h6" style={{ marginBottom: "10px", marginTop: "20px", width: "100%" }}>
          General Information
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" style={{ marginBottom: "10px", width: "100%" }}>
                <TextField
                  variant="outlined"
                  id="name-input"
                  name="name"
                  disabled={!editMode}
                  label="Name"
                  value={state?.name}
                  onChange={handleInputChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" style={{ marginBottom: "10px", width: "100%" }}>
                <TextField
                  variant="outlined"
                  id="email-input"
                  name="email"
                  disabled
                  label="Email"
                  value={userId}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" style={{ marginBottom: "10px", width: "100%" }}>
                <TextField
                  variant="outlined"
                  id="contact-input"
                  name="phoneNo"
                  disabled={!editMode}
                  value={state?.phoneNo}
                  onChange={handleInputChange}
                  label="Phone No"
                  error={Boolean(errors.phoneNo)}
                  helperText={errors.phoneNo}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Typography variant="h6" style={{ marginBottom: "10px", marginTop: "20px" }}>
            Address Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" style={{ marginBottom: "10px", width: "100%" }}>
                <TextField
                  variant="outlined"
                  id="unit-input"
                  name="unit"
                  disabled={!editMode}
                  label="Unit"
                  value={state?.unit}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" style={{ marginBottom: "10px", width: "100%" }}>
                <TextField
                  variant="outlined"
                  id="street-input"
                  name="street"
                  disabled={!editMode}
                  label="Street"
                  value={state?.street}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" style={{ marginBottom: "10px", width: "100%" }}>
                <TextField
                  variant="outlined"
                  id="postalCode-input"
                  name="postalCode"
                  disabled={!editMode}
                  label="Postalcode"
                  value={state?.postalCode}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" style={{ marginBottom: "10px", width: "100%" }}>
                <TextField
                  variant="outlined"
                  id="country-input"
                  name="country"
                  disabled={!editMode}
                  label="Country"
                  value={state?.country}
                  onChange={handleInputChange}
                  error={Boolean(errors.country)}
                  helperText={errors.country}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" style={{ marginBottom: "10px", width: "100%" }}>
                <TextField
                  variant="outlined"
                  id="province-input"
                  name="province"
                  disabled={!editMode}
                  label="Province"
                  value={state?.province}
                  onChange={handleInputChange}
                  error={Boolean(errors.province)}
                  helperText={errors.province}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" style={{ marginBottom: "10px", width: "100%" }}>
                <TextField
                  variant="outlined"
                  id="city-input"
                  name="city"
                  disabled={!editMode}
                  label="City"
                  value={state?.city}
                  onChange={handleInputChange}
                  error={Boolean(errors.city)}
                  helperText={errors.city}
                />
              </FormControl>
            </Grid>
          </Grid>

          {!editMode ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={enableEditMode}
              style={{ marginTop: "10px" }}>
              Edit Profile
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={saveProfileHandler}
              style={{ marginTop: "10px" }}>
              Save Profile
            </Button>
          )}
        </form>
      </Card>
    </Grid>
  );
};

export default UserProfile;
