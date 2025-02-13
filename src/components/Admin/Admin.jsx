import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../../styles/Admin.module.css";
import AddProductForm from "./ProductsManage/AddProductForm";
import DeleteProduct from "./ProductsManage/DeleteProduct";
import GetProduct from "./ProductsManage/GetProduct";
import UpdateProduct from "./ProductsManage/UpdateProduct";
import GetUser from "./UsersManage/GetUser";
import DeleteUser from "./UsersManage/DeleteUser";
import AddCategory from "./ManageCategories/AddCategory";
import DeleteCategory from "./ManageCategories/DeleteCategory";
import GetCategory from "./ManageCategories/GetCategory";
import UpdateCategory from "./ManageCategories/UpdateCategory";
import UpdateUser from "./UsersManage/UpdateUser"; // eslint-disable-line no-unused-vars

const Admin = () => {
  const { currentUser } = useSelector(({ user }) => user);
  const [activeTab, setActiveTab] = useState("Products");
  const [activeProductTab, setActiveProductTab] = useState("Add Product");
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !currentUser ||
      !currentUser.authorities.some((role) => role.authority === "ROLE_ADMIN")
    ) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleProductTabClick = (tab) => {
    setActiveProductTab(tab);
  };

  return (
    <section className={styles.panel}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${
            activeTab === "Products" && styles.active
          }`}
          onClick={() => handleTabClick("Products")}
        >
          Manage Products
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === "UsersControll" && styles.active
          }`}
          onClick={() => handleTabClick("UsersControll")}
        >
          Manage Users
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === "CategoryControll" && styles.active
          }`}
          onClick={() => handleTabClick("CategoryControll")}
        >
          Manage Categories
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "Products" && (
          <div>
            <div className={styles.tabs}>
              <div
                className={`${styles.tab} ${
                  activeProductTab === "Add Product" && styles.active
                }`}
                onClick={() => handleProductTabClick("Add Product")}
              >
                Add Product
              </div>
              <div
                className={`${styles.tab} ${
                  activeProductTab === "Delete Product" && styles.active
                }`}
                onClick={() => handleProductTabClick("Delete Product")}
              >
                Delete Product
              </div>
              <div
                className={`${styles.tab} ${
                  activeProductTab === "Update Product" && styles.active
                }`}
                onClick={() => handleProductTabClick("Update Product")}
              >
                Update Product
              </div>
              <div
                className={`${styles.tab} ${
                  activeProductTab === "Get Product" && styles.active
                }`}
                onClick={() => handleProductTabClick("Get Product")}
              >
                Get Product
              </div>
            </div>
            <div className={styles.subTabContent}>
              {activeProductTab === "Add Product" && <AddProductForm />}
              {activeProductTab === "Delete Product" && <DeleteProduct />}
              {activeProductTab === "Update Product" && <UpdateProduct />}
              {activeProductTab === "Get Product" && <GetProduct />}
            </div>
          </div>
        )}
        {activeTab === "UsersControll" && (
          <div>
            <div className={styles.tabs}>
              <div
                className={`${styles.tab} ${
                  activeProductTab === "Get User" && styles.active
                }`}
                onClick={() => handleProductTabClick("Get User")}
              >
                Get User
              </div>
              <div
                className={`${styles.tab} ${
                  activeProductTab === "Delete User" && styles.active
                }`}
                onClick={() => handleProductTabClick("Delete User")}
              >
                Delete User
              </div>
            </div>
            <div className={styles.subTabContent}>
              {activeProductTab === "Get User" && <GetUser />}
              {activeProductTab === "Delete User" && <DeleteUser />}
            </div>
          </div>
        )}
        {activeTab === "CategoryControll" && (
          <div>
          <div className={styles.tabs}>
            <div
              className={`${styles.tab} ${
                activeProductTab === "Add Category" && styles.active
              }`}
              onClick={() => handleProductTabClick("Add Category")}
            >
              Add Category
            </div>
            <div
              className={`${styles.tab} ${
                activeProductTab === "Delete Category" && styles.active
              }`}
              onClick={() => handleProductTabClick("Delete Category")}
            >
              Delete Category
            </div>
            <div
              className={`${styles.tab} ${
                activeProductTab === "Update Category" && styles.active
              }`}
              onClick={() => handleProductTabClick("Update Category")}
            >
              Update Category
            </div>
            <div
              className={`${styles.tab} ${
                activeProductTab === "Get Category" && styles.active
              }`}
              onClick={() => handleProductTabClick("Get Category")}
            >
              Get Category
            </div>
          </div>
          <div className={styles.subTabContent}>
            {activeProductTab === "Add Category" && <AddCategory />}
            {activeProductTab === "Delete Category" && <DeleteCategory />}
            {activeProductTab === "Update Category" && <UpdateCategory />}
            {activeProductTab === "Get Category" && <GetCategory />}
            
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Admin;
