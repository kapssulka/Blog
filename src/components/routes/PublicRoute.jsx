import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { RotateLoader } from "react-spinners";

export default function PublicRoute({ children }) {
  const [user, setUser] = useState(undefined);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setTimeout(() => {
        setLoader(false);
      }, 600);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined || loader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RotateLoader size={30} margin={20} color="#f59e0b" />
      </div>
    );
  }

  return user ? <Navigate to="/" replace /> : children;
}
