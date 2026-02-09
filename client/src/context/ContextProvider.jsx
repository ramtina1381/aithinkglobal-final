import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase";

const AuthContext = createContext({ user: null, role: null, loading: true });
const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inactivityTimeout, setInactivityTimeout] = useState(null);

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    // Clear existing timeout
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }

    // Only set timeout if user is logged in
    if (user) {
      const newTimeout = setTimeout(async () => {
        console.log("User inactive for 10 minutes. Logging out...");
        try {
          await signOut(auth);
          setUser(null);
          setRole(null);
        } catch (err) {
          console.error("Error logging out:", err);
        }
      }, INACTIVITY_TIMEOUT);

      setInactivityTimeout(newTimeout);
    }
  };

  // Set up activity listeners
  useEffect(() => {
    if (!user) return;

    const activityEvents = [
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleActivity = () => {
      resetInactivityTimer();
    };

    // Add event listeners for user activity
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // Initial timer setup
    resetInactivityTimer();

    return () => {
      // Clean up event listeners
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      // Clear timeout
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }
    };
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setRole(null);
        setLoading(false);
        // Clear timeout when user logs out
        if (inactivityTimeout) {
          clearTimeout(inactivityTimeout);
        }
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setRole(data?.role || "user");
        } else {
          setRole("user");
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = { user, role, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
