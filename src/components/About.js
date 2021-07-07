import {
  Paper,
  SegmentedControl,
  TextInput,
  Button,
  Text,
} from "@mantine/core";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

export default function About() {
  return (
    <div>
      <div className='app-page-description'>
        <Text color='white' style={{ fontWeight: "bold", fontSize: "26px" }}>
          About
        </Text>
        <Text color='gray'>
          An illustration to value your own time. Created by MichaelXF and
          open-source under the MIT License.
          <br />
          <br />
          This website uses React combined with Mantine for UI components.
          <br />
          <br />
          Source code hosted on GitHub.
        </Text>
      </div>

      <div className='app-go-button-wrapper'>
        <Button
          component='a'
          target='_blank'
          href='https://github.com/MichaelXF/age-illustration'
          style={{ padding: "0 34px" }}
          size='sm'
          color='gray'
          rightIcon={<FaExternalLinkSquareAlt />}
        >
          GitHub
        </Button>
      </div>
    </div>
  );
}
