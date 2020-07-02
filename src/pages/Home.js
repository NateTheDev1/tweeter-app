import React from "react";
import NewUserModal from "../components/NewUserModal";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getUser } from "../actions/authActions";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: true };
  }

  componentDidMount() {
    if (this.props.user === null) {
      const token = localStorage.getItem("token");
      this.props.getUser(token);
    }
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
          <h1>HOME SCREEN WITH PROFILE</h1>
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
  };
};

export default connect(mapStateToProps, { getUser })(Home);
