import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import axios from "axios";
import { Container, Button } from "@mui/material";
import styled from "@emotion/styled";
import TheatreModal from "../../../components/TheatreModal";
import { toast } from "react-toastify";

const Heading = styled("h1")({
  fontSize: "24px",
  fontWeight: "bold",
});

const HeadingWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
  marginTop: "1rem",
});

const TableWrapper = styled("div")({
  width: "100%",
  border: "1px solid #ddd",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  marginBottom: "1rem",
  padding: "1rem",
});

const AddButton = styled(Button)({
  marginLeft: "1rem",
});

const Theatre = () => {
  const [theatreData, setTheatres] = useState([]);
  const [screens, setScreens] = useState([]);
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState({});

  useEffect(() => {
    fetchScreenData();
    fetchTheatreData();
  }, []);

  const columns = React.useMemo(() => [{ Header: "Name", accessor: "name" }], []);

  const fetchScreenData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/screen`);
      setScreens(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchTheatreData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/theatre`);
      setTheatres(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (theatreData) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/admin/theatre/${theatreData._id}`
      );
      screens.forEach(async (screen) => {
        if (screen.theatre._id === theatreData._id) {
          await axios.delete(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/admin/screen/${screen._id}`
          );
        }
      });
      if (data.success) {
        fetchTheatreData();
        fetchScreenData();
        toast.success("Theatre Deleted Successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = (data) => {
    setOpen(true);
    setIsUpdate(true);
    setSelectedTheatre(data);
  };

  const handleSubmit = async (theatreData) => {
    try {
      let success = false;
      if (isUpdate) {
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/admin/theatre/${theatreData._id}`,
          theatreData
        );
        success = data.success;
      } else {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/admin/theatre`,
          theatreData
        );
        success = data.success;
      }
      if (success) {
        fetchTheatreData();
        toast.success(`Theatre ${isUpdate ? "Updated" : "Added"} Successfully`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <TheatreModal
        open={open}
        onClose={() => {
          setOpen(false);
          setIsUpdate(false);
        }}
        isUpdate={isUpdate}
        theatreData={selectedTheatre}
        onSubmit={handleSubmit}
      />
      <Container justifyContent="center">
        <HeadingWrapper>
          <Heading>Theatre Management</Heading>
          <AddButton
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(true);
            }}>
            Add Theatre
          </AddButton>
        </HeadingWrapper>
        <TableWrapper>
          <Table
            columns={columns}
            data={theatreData}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        </TableWrapper>
      </Container>
    </>
  );
};

export default Theatre;
