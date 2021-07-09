import { Transition } from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import IntroWidget from "./components/IntroWidget";
import ViewWidget from "./components/ViewWidget";
import { DOBContext } from "./Context";

export default function MainComponent() {
  /**
   * Is the user on the starting page
   */
  var [onIntroPage, setIntroPage] = useState(false);
  var [onViewPage, setViewPage] = useState(false);

  var { DOB } = useContext(DOBContext);

  var [type, setType] = useLocalStorageValue({
    key: "TYPE",
    defaultValue: "" /** "age_as_decimal" | "seconds_remaining" */,
  });
  var [data, setData] = useState([
    /** [YEAR, MONTH, DAY], estimatedLifeSpan? */
  ]);

  /**
   * On init, reveal intro page
   */
  useEffect(() => {
    setTimeout(() => {
      if (type && type !== "null" && DOB && Array.isArray(DOB)) {
        onSubmit(type, DOB.slice(0, 3), 78);
      } else {
        setIntroPage(true);
      }
    }, 200);
  }, []);

  function onSubmit(type, DOB, estimatedLifeSpan = null) {
    setIntroPage(false);
    setTimeout(() => {
      setViewPage(true);
    }, 700);
    setType(type);
    setData([DOB, estimatedLifeSpan]);
  }

  function onBackButton() {
    setViewPage(false);

    /**
     * show intro widget after view widget is hidden
     */
    setTimeout(() => {
      setIntroPage(true);
    }, 700);

    /**
     * reset "type" in the local storage
     */
    setTimeout(() => {
      setType("");
    }, 900);
  }

  return (
    <div>
      <Transition
        mounted={onIntroPage}
        transition='fade'
        duration={800}
        timingFunction='ease'
      >
        {(styles) => {
          return (
            <div style={styles}>
              <IntroWidget onSubmit={onSubmit} />
            </div>
          );
        }}
      </Transition>
      <Transition
        mounted={onViewPage}
        transition='fade'
        duration={800}
        timingFunction='ease'
      >
        {(styles) => {
          return (
            <div style={styles}>
              <ViewWidget data={data} type={type} onBackButton={onBackButton} />
            </div>
          );
        }}
      </Transition>
    </div>
  );
}
