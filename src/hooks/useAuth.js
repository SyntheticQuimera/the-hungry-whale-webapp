import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export const useAuth = () => {
  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(auth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setUserMenu(!userMenu);
    }
  };
  const logout = () => {
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  const [userMenu, setUserMenu] = useState(false);

  const userName = user !== null ? user.displayName : "Login!";

  return {
    user,
    login,
    userMenu,
    setUserMenu,
    userName,
    logout,
  };
};
