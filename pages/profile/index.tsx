import {
  Avatar,
  Text,
  Container,
  Flex,
  Group,
  Title,
  Textarea,
  useInputProps,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import prisma from "../../lib/prisma";
import { getSession, useSession } from "next-auth/react";
import ProfilePageCard from "../../components/Users/ProfilePageCard";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconExclamationCircle } from "@tabler/icons";
import { useRouter } from "next/router";

export default function Profile({ user }) {
  useSession({
    required: true,
  });
  return (
    <Container size="sm">
      <Title order={1}>Profile</Title>
      <Group position="center">
        <ProfilePageCard {...user} />
      </Group>
      <Group position="center" className="mt-10 flex flex-col">
        <Title mb={4} order={2}>
          Your Details
        </Title>
        <Group>
          <div className="flex flex-col gap-4">
            <div>
              <Text>DOB</Text>
              <DatePicker
                value={user.dob && new Date(user.dob)}
                clearable={false}
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
                        showNotification({
                          title: "Error",
                          message: resData.error,
                          color: "red",
                          icon: <IconExclamationCircle />,
                        });
                      } else {
                        router.reload();
                        showNotification({
                          title: "Success",
                          message: "Your profile has been updated",
                          color: "green",
                          icon: <IconCheck />,
                        });
                      }
                    })
                    .catch((err) => {
                      alert(err);
                    });
                }}
              />
            </div>
            <div>
              <Text>Bio</Text>
              <Textarea
                value={user.bio || ""}
                onChange={(e) => {
                  // fetch("/api/users/update", {
                  //   method: "PUT",
                  //   headers: {
                  //     "Content-Type": "application/json",
                  //   },
                  //   body: JSON.stringify({
                  //     bio: e.target.value,
                  //   }),
                  // })
                  //   .then((res) => res.json())
                  //   .then((resData) => {
                  //     if (resData.error) {
                  //       alert(resData.error);
                  //     } else {
                  //       alert("Success");
                  //     }
                  //   })
                  //   .catch((err) => {
                  //     alert(err);
                  //   });
                  console.log(e.target.value);
                }}
              />
            </div>
          </div>
        </Group>
      </Group>
    </Container>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });
  if (!session) {
    return res.redirect("/api/auth/signin");
  } else {
    let user = await prisma.user.findUnique({
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
    });

    user = JSON.parse(JSON.stringify(user));
    return {
      props: {
        user: user,
      },
    };
  }
}
