import React from "react";

/* It will be used to access the global state of the user */
import { useSelector } from "react-redux";

/* We will do an async task through it. */
import { useEffect } from "react";

/* It will be used to navigate to different routes */
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn" onClick={() => navigate("/alltasks")}>
            Check Tasks
          </button>
        </div>
      </section>
      <TaskForm />
    </>
  );
};

export default Dashboard;
