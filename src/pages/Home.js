import React from "react";
import NewUserModal from "../components/NewUserModal";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getUser, getProfile, getAllPosts } from "../actions/authActions";
import HomeScreen from "../components/HomeScreen";
import styled from "styled-components";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: true };
  }

  componentDidMount() {
    console.log("Mounting");
    const token = localStorage.getItem("token");

    this.props.getUser(token);

    this.props.getProfile(token);
    this.props.getAllPosts();
  }

  setToast = (res) => {
    if (res === "OK") {
      toast.configure();
      toast.success("Profile Created Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.configure();
      toast.error(this.props.error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  handleModal = () => {
    this.setState({ ...this.state, modalOpen: false });
  };

  render() {
    if (this.props.loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        {this.props.user !== null && !this.props.user.hasProfile ? (
          <NewUserModal
            open={this.state.modalOpen}
            setToast={this.setToast}
            handleModal={this.handleModal}
          />
        ) : (
          <HomeScreen />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    loading: state.globalReducer.loading,
    error: state.authReducer.error,
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, { getUser, getProfile, getAllPosts })(
  Home
);
