// Author - Roshil Ka Patel (B00917345)
import { Button, Chip, Container, Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
// import CustomButton from "../../../components/UI/CustomButton";
// import { MDBDataTableV5 } from "mdbreact";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActivationStateAction,
  deleteFoodItem,
  getAllFoodItemsAction,
} from "../../../store/FoodAndBeverages/actions";
// import CustomSpinner from "../../../components/UI/CustomSpinner";
import FoodModal from "../../../components/FoodModal";
import styled from "@emotion/styled";

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

// const Container = styled(Box)(() => ({
//   padding: "20px",
//   marginTop: "2rem",
// }));

// const Colums = [
//   {
//     label: "Name",
//     field: "name",
//   },
//   {
//     label: "Description",
//     field: "description",
//   },
//   { label: "Type", field: "type" },
//   {
//     label: "Price",
//     field: "price",
//   },
//   {
//     label: "Status",
//     field: "isActive",
//   },
//   {
//     label: "Action",
//     field: "action",
//   },
// ];

const Colums = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  { Header: "Type", accessor: "type" },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Status",
    accessor: "isActive",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const index = () => {
  const dispatch = useDispatch();

  const { foodItems, loading } = useSelector((state) => state.foodReducer);

  const [showAddCard, setShowAddCard] = useState(false);
  const [updateItem, setUpdateItem] = useState();

  const handleActivationChange = (item) => {
    dispatch(changeActivationStateAction({ id: item._id, status: `${!item.isActive}` }));
  };

  const handleDeleteItem = (item) => {
    dispatch(deleteFoodItem(item._id));
  };

  const handleUpdateItem = (item) => {
    setUpdateItem(item);
    setShowAddCard(true);
  };

  const getFoodItems = useMemo(() => {
    const data = foodItems.map((item) => ({
      ...item,
      type: item?.category?.charAt(0)?.toUpperCase() + item?.category?.slice(1),
      isActive: item.isActive ? (
        <Chip label="Active" color="success" />
      ) : (
        <Chip label="Inactive" color="error" />
      ),
      action: (
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => handleActivationChange(item)}
              color={item.isActive ? undefined : "success"}>
              {item.isActive ? "Deactivate" : "Activate"}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={() => handleUpdateItem(item)}>
              Update
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={() => handleDeleteItem(item)}>
              Delete
            </Button>
          </Grid>
        </Grid>
      ),
    }));
    return data;
  }, [foodItems]);

  useEffect(() => {
    dispatch(getAllFoodItemsAction());
  }, [dispatch]);

  return (
    <>
      <FoodModal
        open={showAddCard}
        onClose={() => setShowAddCard(false)}
        loading={loading}
        setUpdateItem={setUpdateItem}
        updateItem={updateItem}
      />
      <Container justifyContent="center">
        <HeadingWrapper>
          <Heading>Food And Beverages</Heading>
          <AddButton
            variant="contained"
            color="primary"
            onClick={() => {
              setShowAddCard(true);
            }}>
            Add Item
          </AddButton>
        </HeadingWrapper>
        <TableWrapper>
          <Table
            columns={Colums}
            data={getFoodItems}
            noAction={true}
            // handleDelete={handleDelete}
            // handleUpdate={handleUpdate}
          />
        </TableWrapper>
      </Container>
      {/* <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        style={{ marginBottom: "1rem" }}>
        <Typography variant="h2" color="secondary">
          Food And Beverages
        </Typography>
        <CustomButton variant="contained" onClick={() => setShowAddCard(true)}>
          ADD ITEM
        </CustomButton>
      </Grid> */}

      {/* {loading ? (
        <CustomSpinner center />
      ) : (
        <MDBDataTableV5
          bordered
          responsive
          hover
          displayEntries={false}
          entries={10}
          pagesAmount={4}
          data={{ columns: Colums, rows: getFoodItems }}
          fullPagination
        />
      )} */}
    </>
  );
};

export default index;
