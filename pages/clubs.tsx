import { Grid, Title } from "@mantine/core";
import React from "react";
import { CommCard } from "../components/Communities/CommCard";
import prisma from "../lib/prisma";

const clubs = ({ clubs }) => {
  return (
    <div>
      <Title order={1}>Communities at SJEC</Title>
      <Grid>
        {clubs.map((club, index) => (
          <Grid.Col key={index} span={4}>
            <CommCard {...club} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export async function getServerSideProps() {
  const clubs = await prisma.community.findMany({
    select: {
      name: true,
      description: true,
      logo: true,
      website: true,
      contact: true,
    },
  });
  return {
    props: {
      clubs,
    },
  };
}

export default clubs;
