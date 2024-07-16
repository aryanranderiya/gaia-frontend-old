import React, { createContext, useState, useContext, useEffect } from "react";

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  
  const [userInfo, setUserInfo] = useState(
    () => JSON.parse(localStorage.getItem("userInfo")) || {}
  );

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfoContext = () => {
  return useContext(UserInfoContext);
};
