import React, { useState } from "react";
import { Modal, Avatar } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import Axios from "axios";
import { FileUpload, FormDiv } from "./Styled/NewUserModalStyled";

const API_KEY = "827878474497588";

const NewUserModal = ({ open }) => {
  const handleSubmit = () => {};

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const handleImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "tweeter");
    data.append("api_key", API_KEY);
    data.append("timestamp", Date.now());
    setImageLoading(true);
    const res = await Axios.post(
      "https://api.cloudinary.com/v1_1/tweeter/image/upload",
      data
    );

    setImage(res.data.url);
    setImageLoading(false);
  };

  return (
    <Modal
      bodyStyle={{ height: "55vh" }}
      title={
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 400,
            marginTop: "2%",
            marginBottom: "2%",
            color: "#1DA1F2",
          }}
        >
          Create Your Profile
        </h1>
      }
      visible={open}
      footer={null}
      closable={false}
    >
      <FormDiv>
        <h3>Profile Image</h3>
        <Avatar
          size={96}
          icon={image == null ? <UserOutlined /> : <img src={image} />}
          style={{ marginBottom: "2%", marginTop: "2%" }}
        />
        <FileUpload>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            style={{ border: "none" }}
          />
          Choose A Rock On Picture <CameraOutlined />
        </FileUpload>
        <h3>Full Name</h3>
        <input type="text" placeholder="John Doe" />
        <h3>Username</h3>
        <input type="text" placeholder="john_doe" />
        <button>Create Profile</button>
      </FormDiv>
    </Modal>
  );
};

export default NewUserModal;
