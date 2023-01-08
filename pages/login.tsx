
import { Text, Paper, Group, PaperProps, Button } from "@mantine/core";
import { signIn } from "next-auth/react";
// import { GoogleButton } from '../SocialButtons/SocialButtons';

export default function AuthenticationForm(props: PaperProps) {
  return (
    <div className="flex items-center justify-center">
      <Group position="center">
        <Paper radius="md" p="xl" withBorder {...props} className="w-full">
          <Text size="lg" weight={500}>
            Welcome to Converse, login with your SJEC Student Account
          </Text>
          <Group grow mb="md" mt="md">
            <Button radius="xl" onClick={() => signIn('google')}>  Google</Button>
          </Group>
          {/* <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}
        </Paper>
      </Group>
    </div>
  );
}
