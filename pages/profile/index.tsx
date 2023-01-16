import { Text, Container, Group, Title, Textarea } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import prisma from "../../lib/prisma";
import { getSession, useSession } from "next-auth/react";
import ProfilePageCard from "../../components/Users/ProfilePageCard";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconExclamationCircle } from "@tabler/icons";
import { useDebouncedValue, useInputState } from "@mantine/hooks";
import { useEffect, useState } from "react";

export default function Profile({ user }) {
  useSession({
    required: true,
  });
  const [bio, setBio] = useInputState(user.bio);
  const [debouncedBio] = useDebouncedValue(bio, 3000);
  const [dob, setDob] = useState(user.dob);

  useEffect(() => {
    const updateBio = async (bio) => {
      if (!bio || bio === user.bio) return;
      fetch("/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: bio,
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
          }
        })
        .catch((err) => {
          showNotification({
            title: "Error",
            message: err,
            color: "red",
            icon: <IconExclamationCircle />,
          });
        });
    };
    updateBio(debouncedBio);
  }, [debouncedBio, user.bio]);

  useEffect(() => {
    const updateDOB = async (dob) => {
      if (!dob || dob === user.dob) return;
      fetch("/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dob: new Date(dob).setDate(new Date(dob).getDate() + 1),
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
    };
    updateDOB(dob);
  }, [dob, user.dob]);

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
                value={new Date(dob)}
                clearable={false}
                onChange={setDob}
              />
            </div>
            <div>
              <Text>Bio</Text>
              <Textarea value={bio} onChange={setBio} />
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
