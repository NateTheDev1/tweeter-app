import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Empty, Card, Statistic } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import Axios from "axios";
import NumberFormat from "react-number-format";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  font-family: "Mukta", sans-serif;
  border: 1px solid #e6ecf0;

  & h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2%;
  }

  && .header {
    padding: 2%;
    display: flex;
    flex-direction: column;
    padding: 3%;
    border-bottom: 1px solid #e6ecf0;
    min-height: 8vh;
    width: 100%;
  }

  && .activity-feed {
    margin-top: 5%;
    padding: 2%;

    & h2 {
      font-size: 1.8rem;
    }
  }

  && .card {
    margin-bottom: 5%;
  }

  && .stat-title {
    font-weight: 500;
    font-size: 1.5rem;
  }
`;

const Activity = ({ profile }) => {
  const [posts, setPosts] = useState(null);
  const [likes, setLikes] = useState(0);
  const [engagement, setEngagement] = useState(0);

  useEffect(() => {
    Axios.get(
      `https://tweeter-app-api.herokuapp.com/api/posts/${profile.account}`
    )
      .then(async (res) => {
        setPosts(res.data);
        calcLikes(res.data);
        calcEngagement(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const calcLikes = (data) => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      count += data[i].likedBy.length;
    }
    setLikes(count);
    console.log(count);
  };

  const calcEngagement = (data) => {
    let ratio = 0;
    for (let i = 0; i < data.length; i++) {
      ratio += data[i].likedBy.length;
    }

    setEngagement((ratio / 2) * 100);
  };

  if (posts === null) {
    return (
      <Container>
        <div className="header">
          <h2>Activity</h2>
          <p>Updated Just Now</p>
        </div>
        <Empty
          style={{ marginTop: "5%" }}
          imageStyle={{ height: 150 }}
          description={
            <span style={{ fontSize: "1.2rem" }}>
              You have no interactions.
            </span>
          }
        />
      </Container>
    );
  }

  return (
    <Container>
      <div className="header">
        <h2>Activity</h2>
        <p>Updated Just Now</p>
      </div>
      <div className="activity-feed">
        <Card className="card">
          <Statistic
            title={<h2 className="stat-title">Liked Posts</h2>}
            value={profile.likedPosts.length}
            precision={0}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
        <Card className="card">
          <Statistic
            title={<h2 className="stat-title">Created Posts</h2>}
            value={posts.length}
            precision={0}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
        <Card className="card">
          <Statistic
            title={<h2 className="stat-title">Lifetime Likes</h2>}
            value={likes}
            precision={0}
            valueStyle={{ color: likes < 1 ? "gray" : "#3f8600" }}
            prefix={likes < 1 ? "---" : <ArrowUpOutlined />}
          />
        </Card>
        <Card className="card">
          <Statistic
            title={<h2 className="stat-title">Engagement</h2>}
            value={engagement}
            precision={0}
            valueStyle={{ color: engagement < 1 ? "gray" : "#3f8600" }}
            suffix="%"
          />
        </Card>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.authReducer.profile,
  };
};

export default connect(mapStateToProps, {})(Activity);
