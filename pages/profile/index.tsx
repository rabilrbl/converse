import { Avatar, Text, Container, Flex, Group, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import prisma from "../../lib/prisma";
import { getSession, useSession } from "next-auth/react";
import ProfilePageCard from "../../components/Users/ProfilePageCard";

export default function Profile({ user }) {
  useSession({
    required: true,
  });

  return (
    <Container size="lg">
      <Title order={1}>Profile</Title>
      <Group position="center">
        <ProfilePageCard {...user} />
      </Group>
      <div className="mt-10">
        <Group position="center">
          <Group position="center">
            <Text>DOB</Text>
            <DatePicker
              value={user.dob && new Date(user.dob)}
              onChange={(value) => {
                fetch("/api/users/update", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    dob: value,
                  }),
                })
                  .then((res) => res.json())
                  .then((resData) => {
                    if (resData.error) {
                      alert(resData.error);
                    } else {
                      alert("Success");
                    }
                  })
                  .catch((err) => {
                    alert(err);
                  });
              }}
            />
          </Group>
        </Group>
      </div>
    </Container>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        user: await prisma.user.findUnique({
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
            gender: true,
          },
        }),
      },
    };
  }
}
