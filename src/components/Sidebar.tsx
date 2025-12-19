type Props = {
  active: string;
  onChange: (section: string, query?: string) => void;
};

export default function Sidebar({ active, onChange }: Props) {
  return (
    <aside className="sidebar">
      <h2 className="logo">
        <a  onClick={() => onChange("home")}>
          <img
            src="/logo.png"
            width={"80px"}
            height={"80px"}
            style={{
              borderRadius: "100%",
              cursor: "pointer",
            }}
            alt="Logo"
          />
        </a>
      </h2>

      <button
        className={active === "home" ? "active" : ""}
        onClick={() => onChange("home")}
      >
        Home
      </button>

      <button
        className={active === "projects" ? "active" : ""}
        onClick={() => onChange("projects")}
      >
        Projects
      </button>

      <button
        className={active === "contact" ? "active" : ""}
        onClick={() => onChange("contact")}
      >
        Contact Info
      </button>
    </aside>
  );
}
