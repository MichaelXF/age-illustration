import { MantineProvider, GlobalStyles, Paper } from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import "./index.scss";

import { useMemo, useState } from "react";
import MainComponent from "./MainComponent";
import { DOBContext } from "./Context";
import Footer from "./components/Footer";

function App() {
  var [DOBLSV, setDOBLSV] = useLocalStorageValue({
    key: "DOB",
    defaultValue: ",,",
  });

  var [DOB, setDOB] = useState(DOBLSV ? DOBLSV.split(",") : []);

  var DOBValue = useMemo(() => {
    setDOBLSV(DOB.join(","));
    return { DOB, setDOB };
  }, [DOB]);

  return (
    <DOBContext.Provider value={DOBValue}>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <GlobalStyles />

        <MainComponent />
        <Footer />
      </MantineProvider>
    </DOBContext.Provider>
  );
}

export default App;
