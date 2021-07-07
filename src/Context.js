import { createContext } from "react";

export const DOBContext = createContext({
  DOB: [
    /** year, */
    /** month, */
    /** day */
  ],
  setDOB: () => {},
});
