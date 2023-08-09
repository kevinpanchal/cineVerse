import React from "react";
import AdminHeader from "../../components/AdminHeader";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
};

export default AdminLayout;
