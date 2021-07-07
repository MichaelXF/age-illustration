import { Button } from "@mantine/core";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <div className='app-footer'>
      <Button
        component='a'
        href='https://github.com/MichaelXF/age-illustration'
        target='_blank'
        style={{ marginLeft: "auto" }}
        color='gray'
        size='xs'
        rightIcon={<FaExternalLinkSquareAlt />}
      >
        GitHub
      </Button>
    </div>
  );
}
