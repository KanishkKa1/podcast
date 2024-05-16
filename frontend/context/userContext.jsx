import axios from "axios";
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // Importing js-cookie

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token"); 

    if (token) {
      axios
        .get("/api/v1/user/profile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
        .then(({ data }) => {
          setUser(data); 
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setUser(null);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
