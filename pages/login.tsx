import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Center,
} from '@mantine/core';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';

export default function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val: string) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
        <div className='pr-56'>
            <Paper radius="md" p="xl" withBorder {...props} className="w-full">
              <Text size="lg" weight={500}>
                Welcome to Converse, {type} with
              </Text>
              <Group grow mb="md" mt="md">
                {/* <GoogleButton radius="xl">Google</GoogleButton> */}
                {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
              </Group>
              {/* <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}
              <form onSubmit={form.onSubmit(() => {})}>
                <Stack>
                  {type === 'register' && (
                    <TextInput
                      label="Name"
                      placeholder="Your name"
                      value={form.values.name}
                      onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                    />
                  )}
                  <TextInput
                    required
                    label="Email"
                    placeholder="hello@mantine.dev"
                    value={form.values.email}
                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                    error={form.errors.email && 'Invalid email'}
                  />
                  <PasswordInput
                    required
                    label="Password"
                    placeholder="Your password"
                    value={form.values.password}
                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                    error={form.errors.password && 'Password should include at least 6 characters'}
                  />
                  {type === 'register' && (
                    <Checkbox
                      label="I accept terms and conditions"
                      checked={form.values.terms}
                      onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                    />
                  )}
                </Stack>
                <Group position="apart" mt="xl">
                  <Anchor
                    component="button"
                    type="button"
                    color="dimmed"
                    onClick={() => toggle()}
                    size="xs"
                  >
                    {type === 'register'
                      ? 'Already have an account? Login'
                      : "Don't have an account? Register"}
                  </Anchor>
                  <Button variant='filled' type="submit">{upperFirst(type)}</Button>
                </Group>
              </form>
            </Paper>
        </div>
  );
}