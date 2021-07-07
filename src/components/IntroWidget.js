import { Paper, SegmentedControl } from "@mantine/core";
import { useState } from "react";
import About from "./About";
import AgeAsDecimal from "./AgeAsDecimal";
import SecondsRemaining from "./SecondsRemaining";

export default function IntroWidget({ onSubmit }) {
  /**
   * The tab selected
   */
  var [page, setPage] = useState("age_as_decimal");

  return (
    <Paper
      padding='md'
      radius={"10px"}
      shadow='md'
      className='app-main-component'
    >
      <div className='app-main-component-body'>
        <div className='app-main-component-tab-switcher-wrapper'>
          <SegmentedControl
            value={page}
            onChange={(value) => setPage(value)}
            data={[
              { label: "Age as Decimal", value: "age_as_decimal" },
              {
                label: "Seconds Remaining",
                value: "seconds_remaining",
              },
              { label: "About", value: "about" },
            ]}
          />
        </div>

        <div className='app-main-component-body-page'>
          {page == "age_as_decimal" ? (
            <AgeAsDecimal onSubmit={onSubmit} />
          ) : page == "seconds_remaining" ? (
            <SecondsRemaining onSubmit={onSubmit} />
          ) : (
            <About />
          )}
        </div>
      </div>
    </Paper>
  );
}
