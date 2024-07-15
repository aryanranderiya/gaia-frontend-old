import React, { createContext, useState, useContext } from "react";

export const NotLoggedDialogOpenContext = createContext();

export const NotLoggedDialogOpenProvider = ({ children }) => {
  const [notLoggedDialogOpen, setNotLoggedDialogOpen] = useState(false);

  return (
    <NotLoggedDialogOpenContext.Provider
      value={{ notLoggedDialogOpen, setNotLoggedDialogOpen }}
    >
      {children}
    </NotLoggedDialogOpenContext.Provider>
  );
};

export const useNotLoggedDialogOpen = () => {
  return useContext(NotLoggedDialogOpenContext);
};
