import Image from "next/image";
import Meta from "../components/Common/Meta";

export default function Home() {
  return (
    <div className="p-4 bg-blue-500">
      <Meta
        title="Converse"
        description="Converse is a chat app built with Next.js and Mantine."
      />

      <main></main>

      <footer>Footer</footer>
    </div>
  );
}
