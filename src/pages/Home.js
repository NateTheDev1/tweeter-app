import React from "react";
import NewUserModal from "../components/NewUserModal";
import { connect } from "react-redux";
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

  render() {
    return (
      <div>
        {this.props.loading ? (
          <h1>Loading...</h1>
        ) : this.props.user !== null && !this.props.user.hasProfile ? (
          <NewUserModal open={this.state.modalOpen} />
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
  };
};

export default connect(mapStateToProps, { getUser })(Home);
