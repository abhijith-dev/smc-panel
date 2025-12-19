import { useEffect, useState } from "react";
import { getContents } from "../api/getContents";
import { deleteProjects } from "../api/deleteProjects";

interface Project {
  _id: string;
  media: string;
  title: string;
  contentStatus: string;
  createdAt: string;
}



function formatedText(text: string, length: number) {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
}

function contentStatusColor(status: string) {
  switch (status) {
    case "upcoming":
      return <span style={{ color: "#93948a" }}>Upcoming</span>;
    case "ongoing":
      return <span style={{ color: "#0e87e3" }}>Ongoing</span>;
    case "completed":
      return <span style={{ color: "#0e5c12" }}>Completed</span>;
    default:
      return <span>{status}</span>;
  }
}

function toIST(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Home({
  onChange,
}: {
  onChange: (view: string, query?: string) => void;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getContents();
      setProjects(data);
      if (data.length === 0) {
        setIsEmpty(true);
      }
    };
    fetchProjects();
  }, []);

  const handleEditProject = (project : {
    _id: string;
    media: string;
    title: string;
    contentStatus: string;
    createdAt: string;
  }) => {
    console.log("Editing project:", project);
    sessionStorage.setItem("editObj", JSON.stringify(project));
    onChange("projects", "editable=true&id=" + project._id);
  };

  const handleDeleteProject = async (projectId : string) => {
    await deleteProjects(projectId);
    window.location.reload(); 
  }

  return (
    <>
      <h1>Home</h1>
      {projects.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Picture</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project, i) => (
              <tr key={project._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={`${project.media}`}
                    alt={`${project.title}`}
                    width="60"
                    height="60"
                  />
                </td>
                <td title={project.title}>{formatedText(project.title,20)}</td>
                <td>{contentStatusColor(project.contentStatus)}</td>
                <td>{toIST(project.createdAt)}</td>
                <td>
                  <button onClick={() => {handleEditProject(project)}} className="small-btn">
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => {handleDeleteProject(project._id)}} className="small-btn del">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="state-wrapper">
          <div className="state-card">
            <div className={`${!isEmpty ? "spinner" : "null"}`} />
            <p className="state-text">
              {isEmpty ? "No projects found" : "Loading projects..."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
