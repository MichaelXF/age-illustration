import { Heading, Text, Menu, MenuItem, Button } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaArrowRight } from "react-icons/fa";
import { numberWithCommas } from "../utils";

export default function ViewWidget({ data, type, onBackButton }) {
  var h1 = useRef();

  var [DOB, estimatedLifeSpan] = data || [];
  var date =
    DOB && DOB[0] ? new Date(DOB[0] + " " + DOB[1] + " " + DOB[2]) : null;

  var [length, setLength] = useState("Seconds");
  var [lengthInMs, setLengthInMs] = useState(1000);

  useEffect(() => {
    var cancelled = false;
    var lastOutput;
    var lastBlinkAt;
    var hasBlink;
    var lastBlinkNumber;

    if (h1.current) {
      h1.current.classList.remove("blinking");
    }

    function attemptBlink(doBlink, n) {
      if (doBlink && lastBlinkNumber !== n) {
        if (!hasBlink) {
          h1.current.classList.add("blinking");
          hasBlink = true;
          lastBlinkNumber = n;
          lastBlinkAt = Date.now();
        }
      }

      if (hasBlink && Date.now() - lastBlinkAt > 1000) {
        h1.current.classList.remove("blinking");
        lastBlinkAt = null;
        hasBlink = false;
      }
    }

    function update() {
      if (cancelled) {
        return;
      }

      var output = "";

      if (type == "seconds_remaining") {
        var dieYear = parseInt(DOB[0]) + parseInt(estimatedLifeSpan);
        var dieDate = new Date(dieYear + " " + DOB[1] + " " + DOB[2]);
        var diff = (dieDate.getTime() - Date.now()) / lengthInMs;

        var floored = Math.floor(diff);

        attemptBlink(floored.toString().endsWith("0"), floored);

        output =
          numberWithCommas(floored) +
          " " +
          (floored === 1 ? length.slice(0, length.length - 1) : length);
      } else {
        var years = (Date.now() - date.getTime()) / 1000 / 60 / 60 / 24 / 365;

        var fixed = years.toFixed(8);

        output = numberWithCommas(fixed) + " years";
      }

      if (!lastOutput || output !== lastOutput) {
        if (h1.current) {
          h1.current.innerText = output + "";
          lastOutput = output;
        }
      }

      requestAnimationFrame(update);
    }

    update();

    return () => {
      cancelled = true;
      cancelAnimationFrame(update);
    };
  }, [length, lengthInMs]);

  var topHeader = type == "age_as_decimal" ? "You are..." : "You have";

  return (
    <div className='app-view-widget'>
      <Text style={{ fontStyle: "italic", fontSize: "18px" }}>{topHeader}</Text>
      <h1
        ref={h1}
        style={{
          lineHeight: 1,
          marginTop: "0.3rem",
          marginBottom: "2rem",
          fontSize: "50px",
          fontWeight: "bold",
        }}
      >
        ...computing...
      </h1>
      {type == "age_as_decimal" ? (
        <Text>of age...</Text>
      ) : (
        <Text>
          <Menu
            control={
              <Button
                rightIcon={<FaChevronDown />}
                style={{ marginRight: "0.5rem" }}
              >
                {length}
              </Button>
            }
            menuPosition={{ top: 45, left: 0 }}
            transition='fade'
            transitionDuration={300}
            transitionTimingFunction='ease'
          >
            {[
              ["Seconds", 1000],
              ["Minutes", 1000 * 60],
              ["Hours", 1000 * 60 * 60],
              ["Days", 1000 * 60 * 60 * 24],
              ["Weeks", 1000 * 60 * 60 * 24 * 7],
              ["Months", 1000 * 60 * 60 * 24 * 30],
              ["Years", 1000 * 60 * 60 * 24 * 365],
            ].map(([displayName, inMilliseconds], i) => {
              return (
                <MenuItem
                  key={i}
                  onClick={() => {
                    setLength(displayName);
                    setLengthInMs(inMilliseconds);
                  }}
                >
                  {displayName}
                </MenuItem>
              );
            })}
          </Menu>
          remaining in your life
        </Text>
      )}

      <div style={{ marginTop: "3rem", textAlign: "right" }}>
        <Button
          onClick={() => {
            onBackButton();
          }}
          size='xs'
          variant='link'
          rightIcon={<FaArrowRight />}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
