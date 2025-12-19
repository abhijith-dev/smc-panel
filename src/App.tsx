import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import ContactInfo from "./components/ContactInfo";

import "./app.css";

type Section = "home" | "projects" | "contact";

export default function App() {
  const [active, setActive] = useState<Section>("home");

  const handleChange = (section: Section, query: string = "") => {
    setActive(section);
    const sectionWithQuery = query ? `${section}?${query}` : section;
    window.history.replaceState(null, "", `${sectionWithQuery}`);
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    return (
      <div className="mobile-warning">
        <h2>Dashboard Not Supported on Mobile Devices</h2>
        <p>Please access the dashboard on a desktop or laptop for the best experience.</p>
      </div>
    );
 }

  return (
    <div className="dashboard">
      <Sidebar active={active} onChange={handleChange} />

      <main className="content fade-in">
        {active === "home" && <Home onChange={handleChange} />}
        {active === "projects" && <Projects />}
        {active === "contact" && <ContactInfo />}
      </main>
    </div>
  );
}

