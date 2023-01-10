import { Box, Container, Title } from "@mantine/core";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Profile({ user }) {
  return (
    <Container size="lg">
      <Title order={1}>Profile</Title>
      <Box>
        <p>Email: {user.email}</p>
      </Box>
    </Container>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        user: await new PrismaClient().user.findUnique({
          where: {
            id: Number.parseInt(session.user.id),
          },
          select: {
            image: true,
            email: true,
            name: true,
            dob: true,
            bio: true,
            branchName: true,
          },
        }),
      },
    };
  }
}
