import { Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import IntroWidget from "./components/IntroWidget";
import ViewWidget from "./components/ViewWidget";

export default function MainComponent() {
  /**
   * Is the user on the starting page
   */
  var [onIntroPage, setIntroPage] = useState(false);
  var [onViewPage, setViewPage] = useState(false);

  var [type, setType] = useState(/** "age_as_decimal" | "seconds_remaining" */);
  var [data, setData] = useState([
    /** [YEAR, MONTH, DAY], estimatedLifeSpan? */
  ]);

  /**
   * On init, reveal intro page
   */
  useEffect(() => {
    setTimeout(() => {
      setIntroPage(true);
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

    setTimeout(() => {
      setIntroPage(true);
    }, 700);
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
