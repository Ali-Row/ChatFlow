import React from "react";
import ThoughtForm from "../components/ThoughtForm";
import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";

import { useQuery } from "@apollo/client";

import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";

import Auth from "../utils/auth";

const Home = () => {

  const { loading, data } = useQuery(QUERY_THOUGHTS);

  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const thoughts = data?.thoughts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>

        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
