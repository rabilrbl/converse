import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { useRouter } from "next/router";

const Back = (props: { text?: string }) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      className="mb-4"
      leftIcon={<IconArrowLeft />}
    >
      {props.text ? props.text : "Back"}
    </Button>
  );
};

export default Back;
