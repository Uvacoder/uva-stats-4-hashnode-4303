import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Header from "../components/Header";

export default function Home() {
  const [user, setUser] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/${user}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Hashnode Stats</title>
      </Head>
      <Header />

      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        <h1 className="text-center text-gray-50 text-2xl font-mono font-extrabold">
          Hashnode Stats
        </h1>
        <p className="text-center text-gray-50 text-md font-mono">
          This website shows various statistics of{" "}
          <a
            href="https://hashnode.com"
            target={"_blank"}
            className="font-bold hover:underline"
          >
            hashnode
          </a>{" "}
          users like bio information, posts etc.
        </p>
        <p className="text-center text-gray-50 text-md font-mono">
          This project is open-source and feel free to star it on{" "}
          <a
            href="https://github.com/avneesh0612/hashnode-analytics"
            target={"_blank"}
            className="font-bold hover:underline"
          >
            GitHub
          </a>
          !
        </p>
        <input
          value={user}
          onChange={e => setUser(e.target.value)}
          className="p-2 bg-blue-200 border-blue-400 rounded-lg focus:border-2 focus:outline-none font-mono"
          type="text"
          placeholder="username"
        />
        <Link href={`/${user}`} passHref>
          <a className="text-center text-gray-50 font-mono hover:underline">
            Go to user&apos;s dashboard
          </a>
        </Link>
      </form>
    </div>
  );
}
