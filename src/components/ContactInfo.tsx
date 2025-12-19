import { useEffect, useState } from "react";
import { getContacts } from "../api/getContacts";

export default function ContactInfo() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getContacts();
      setContacts(data);
      if (data.length === 0) {
        setIsEmpty(true);
      }
    };
    fetchProjects();
  }, []);
  return (
    <div>
      <h1>Contact Information</h1>
      {contacts.length > 0 ? (
        <>
          {contacts.map((contact) => (
            <div key={contact._id} className="card full-width">
              <p>
                <strong>Name:</strong> {contact.name}
              </p>
              <p>
                <strong>Email:</strong> {contact.email}
              </p>
              <p>
                <strong>Phone:</strong> {contact.phone}
              </p>
              <p>
                <strong>Location:</strong> {contact.location || "Karnataka, India"} 
              </p>
            </div>
          ))}
        </>
      ) : (
        <div className="state-wrapper">
          <div className="state-card">
            <div className={`${!isEmpty ? "spinner" : "null"}`} />
            <p className="state-text">
              {isEmpty ? "No contacts found" : "Loading contacts..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
