import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects } from "../Slice/projectSlice";
import Navbar from "./Navbar";

const headerStyle = {
  backgroundColor: '#34db48', /* Background color */
  color: 'white', /* Text color */
  padding: '20px', /* Padding */
  textAlign: 'center',
  fontSize: '24px', /* Font size */
  fontFamily: 'Arial, sans-serif', /* Font family */
  textShadow: '2px 2px 4px #333', /* Text shadow */
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', /* Box shadow */
  background: 'linear-gradient(45deg,  #000080,#3498db  )',
};

const AllProjects = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const status = useSelector((state) => state.projects.status);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  }

  if (status === true) {
    return (
      <div className="Plist">
        <Navbar />
        <h1 className="allprojects" style={headerStyle}>
          All Projects
        </h1>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(projects)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Plist">
      <Navbar />
      <h1 className="allprojects" style={headerStyle} >
        All Projects
      </h1>

      <table className="table table-hover" style={{ fontSize: "12px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date and Time</th>
            <th>End Date and Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.projectId}>
              <td>{project.projectId}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{formatDateTime(project.start_date)}</td>
              <td>{formatDateTime(project.end_date)}</td>
              <td>
                <Link
                  to={`/allTickets/${project.projectId}`}
                  className="btn btn-primary"
                >
                  Show Tickets
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProjects;
