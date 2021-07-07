import {
  Paper,
  SegmentedControl,
  TextInput,
  Button,
  Text,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { DOBContext } from "../Context";

export default function SecondsRemaining({ onSubmit }) {
  var { DOB, setDOB } = useContext(DOBContext);

  var [estimatedLifeSpan, setEstimatedLifeSpan] = useState();

  useEffect(() => {
    if (!DOB) {
      setDOB(["", "", ""]);
    }
    setTimeout(() => {
      setEstimatedLifeSpan("7");
      setTimeout(() => {
        setEstimatedLifeSpan("78");
      }, 300);
    }, 300);
  }, []);

  function getErrorString(x) {
    if (!x) {
      return false;
    }
    if (isNaN(x)) {
      return "Invalid number";
    }
    if (x < 0) {
      return "Invalid number";
    }
    if (x > 4000) {
      return "Invalid number";
    }

    return false;
  }

  var day = DOB && DOB[2];
  var month = DOB && DOB[1];
  var year = DOB && DOB[0];

  return (
    <div>
      <div className='app-page-description'>
        <Text color='white' style={{ fontWeight: "bold", fontSize: "26px" }}>
          Seconds Remaining
        </Text>
        <Text color='gray'>
          Enter your date of a birth and view how many seconds how have
          remaining.
        </Text>
      </div>
      <div className='app-dob-flex-wrapper'>
        <TextInput
          variant='filled'
          placeholder='Day'
          label='Day'
          value={day}
          onChange={(e) => setDOB((v) => [v[0], v[1], e.target.value])}
          error={getErrorString(day)}
        />
        <TextInput
          className='app-dob-shifted-label'
          variant='filled'
          placeholder='Month'
          label='/ Month'
          value={month}
          onChange={(e) => setDOB((v) => [v[0], e.target.value, v[2]])}
          error={getErrorString(month)}
        />
        <TextInput
          className='app-dob-shifted-label'
          variant='filled'
          placeholder='Year'
          label='/ Year'
          value={year}
          onChange={(e) => setDOB((v) => [e.target.value, v[1], v[2]])}
          error={getErrorString(year)}
        />
      </div>
      <div className='app-estimated-life-span-wrapper'>
        <TextInput
          variant='filled'
          placeholder='Estimated Life Span (years)'
          label='Estimated Life Span (years)'
          value={estimatedLifeSpan}
          onChange={(e) => setEstimatedLifeSpan(e.target.value)}
          error={getErrorString(estimatedLifeSpan)}
        />
      </div>

      <div className='app-go-button-wrapper'>
        <Button
          style={{ padding: "0 34px" }}
          size='sm'
          rightIcon={<FaArrowRight />}
          onClick={() => {
            if (!DOB || DOB.find((v) => !v || getErrorString(v))) {
              return;
            }
            onSubmit("seconds_remaining", DOB, estimatedLifeSpan);
          }}
        >
          Go
        </Button>
      </div>
    </div>
  );
}
