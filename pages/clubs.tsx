import { Grid, Title } from "@mantine/core";
import React from "react";
import { CommCard } from "../components/Communities/CommCard";

const clubs = () => {
  const clubs = [
    {
      logo: "https://anofile.deta.dev/get/DCr4",
      name: "Crescendo",
      about: "A Music Club from St Joseph Engineering College, Mangalore.",
    },
    {
      logo: "https://anofile.deta.dev/get/Av7l",
      name: "Naval NCC SJEC",
      about: "Motto: Unity and Discipline",
    },
    {
      logo: "https://anofile.deta.dev/get/rGWM",
      name: "Team Gladiator",
      about: "Robowar/Robocombat team",
    },
    {
      logo: "https://anofile.deta.dev/get/gxsC",
      name: "Team Achillius SJEC",
      about: "Building the transport of the future: Electric Solar Vehicle",
    },
    {
      logo: "https://anofile.deta.dev/get/oRgC",
      name: "Team eSJEC Racing",
      about:
        "An Eco-friendly Electric All-Terrain Racing team from St Joseph Engineering college, Mangalore.",
    },
    {
      logo: "https://anofile.deta.dev/get/JiKQ",
      name: "ARC SJEC",
      about: "Automation & Robotics Club",
    },
    {
      logo: "https://anofile.deta.dev/get/Xpv0",
      name: "Team Terrorbull Robotics",
      about: "Robotics Team from SJEC Mangalore",
    },
    {
      logo: "https://anofile.deta.dev/get/DAVk",
      name: "Team SJEC Racing",
      about:
        "Off-road racing team from St Joseph Engineering College, Mangalore",
    },
    {
      logo: "https://anofile.deta.dev/get/0ynP",
      name: "TEDxSJEC",
      about:
        "TEDxSJEC an independently TEDx event organized at St Joseph Engineering College, Mangalore",
    },
    {
      logo: "https://anofile.deta.dev/get/lNVt",
      name: "SJEC Alumni Association",
      about: "Alumni Association od St Joseph Engineering College, Mangalore.",
    },
    {
      logo: "https://anofile.deta.dev/get/EGs6",
      name: "sMaC",
      about: "Content club",
    },
    {
      logo: "https://anofile.deta.dev/get/u2l9",
      name: "Muse",
      about: "Art Club",
    },
    {
      logo: "https://anofile.deta.dev/get/A0oi",
      name: "The sceptix club",
      about:
        "A college-level club in St Joseph Engineering College that promotes the use of Free and Open Source Software.",
    },
  ];
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

export default clubs;
