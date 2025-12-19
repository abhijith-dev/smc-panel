import { useEffect, useState } from "react";
import { postProjects } from "../api/postProject";
import { editProjects } from "../api/editProject";

const UploadInProgressComponent = () => (
  <div
    style={{
      zIndex: 10,
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
    className="state-wrapper"
  >
    <div className="state-card">
      <div className="spinner" />
      <p className="state-text">In progress. Please wait...</p>
    </div>
  </div>
);

const DoneComponent = () => (
  <div
    style={{
      zIndex: 10,
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
    className="state-wrapper"
  >
    <div className="state-card">
      <p className="state-text">Completed successfully!</p>
    </div>
  </div>
);

export default function Projects() {
  const [image, setImage] = useState<File | null>(null);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [done, setDone] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const isEditable = queryParams.get("editable");
  const editObj: {
    _id?: string;
    title?: string;
    description?: string;
    contentStatus?: string;
    media?: string;
  } = {};

  if (isEditable) {
    const id = queryParams.get("id");
    editObj._id = id || undefined;
    const data = sessionStorage.getItem("editObj");
    if (data) {
      const parsedData = JSON.parse(data);
      editObj.title = parsedData.title;
      editObj.description = parsedData.description;
      editObj.contentStatus = parsedData.contentStatus;
      editObj.media = parsedData.media;
    }
  }

  const [title, setTitle] = useState(editObj?.title || "");
  const [description, setDescription] = useState(editObj?.description || "");
  const [contentStatus, setContentStatus] = useState(editObj?.contentStatus || "upcoming");

  useEffect(() => {
    const backdrop = document.querySelector(".dashboard") as HTMLElement;
    if (backdrop && (uploadInProgress || done)) {
      backdrop.style.pointerEvents = "none";
      backdrop.style.userSelect = "none";
    } else {
      backdrop.style.pointerEvents = "auto";
      backdrop.style.userSelect = "auto";
    }
  }, [done, uploadInProgress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditable) {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("contentStatus", contentStatus);
    if (image) fd.append("file", image);
    setUploadInProgress(true);
    await postProjects(fd);
    }
    else {
      const body = {
        _id : editObj._id,
        title,
        description,
        contentStatus,
        media : editObj.media
      };
      setUploadInProgress(true);
      await editProjects(body);
    }
    setUploadInProgress(false);
    setDone(true);
    setTimeout(() => {
      setDone(false);
    }, 2000);
    setTitle("");
    setDescription("");
    setContentStatus("upcoming");
    setImage(null);
  };

  return (
    <>
      <h1>{isEditable ? "Edit Project" : "Create Project"}</h1>


      {uploadInProgress && <UploadInProgressComponent />}
      {done && <DoneComponent />}

      <form className="form" onSubmit={handleSubmit}>
        {
        isEditable && (
          <img src={editObj?.media} title="can't edit image" alt="Project Media" style={{ maxWidth: "300px", marginBottom: "10px" }} />
        )
      }
        <input
          placeholder="Title"
          value={ title }
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={contentStatus}
          onChange={(e) => setContentStatus(e.target.value)}
  
        >
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>

        {!isEditable && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        )}

        <button type="submit">
          {isEditable ? "Update Project" : "Create Project"}
        </button>
      </form>
    </>
  );
}
