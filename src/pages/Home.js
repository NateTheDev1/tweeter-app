import React from "react";
import NewUserModal from "../components/NewUserModal";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: true };
  }

  render() {
    return (
      <div>
        <NewUserModal open={this.state.modalOpen} />
      </div>
    );
  }
}

export default Home;
