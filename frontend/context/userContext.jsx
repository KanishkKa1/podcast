import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/v1/user/profile", { withCredentials: true })
      .then(({ data }) => {
        setUser(data); // Set the user if the request is successful
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setUser(null); // Set the user to null if the request fails
      });
  }, []); // Run only once when the component mounts

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
