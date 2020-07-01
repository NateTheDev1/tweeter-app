import React, { useState } from "react";
import { Modal, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Axios from "axios";

const API_KEY = "827878474497588";
const API_SECRET = "6LqsNiF_akkqXRaWUmAONP2wY18";
const CLOUDINARY_URL =
  "cloudinary://827878474497588:6LqsNiF_akkqXRaWUmAONP2wY18@tweeter";

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
      style={{ padding: "1%" }}
      title={
        <h1 style={{ fontSize: "2rem", fontWeight: 400 }}>
          Create Your Profile
        </h1>
      }
      visible={open}
      footer={null}
      closable={false}
    >
      <form>
        <h3>Full Name</h3>
        <input type="text" placeholder="John Doe" />
        <h3>Profile Image</h3>
        <input
          type="file"
          accept="image/*"
          disabled={imageLoading}
          placeholder="Upload An Image"
          onChange={handleImage}
        />
        <Avatar
          icon={image == null ? <UserOutlined /> : <img src={image} />}
        ></Avatar>
        <h3>Full Name</h3>
        <input type="text" placeholder="John Doe" />
      </form>
    </Modal>
  );
};

export default NewUserModal;
