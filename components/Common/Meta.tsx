import React from "react";
import Head from "next/head";

type MetaProps = {
  title: string;
  description: string;
  image?: string;
};

const Meta = (props: MetaProps) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <link rel="icon" href={props.image || "/favicon.ico"} />
    </Head>
  );
};

export default Meta;
