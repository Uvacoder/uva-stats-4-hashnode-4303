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

      <form
        className="flex flex-col items-center space-y-2"
        onSubmit={handleSubmit}
      >
        <h1 className="font-mono text-2xl font-extrabold text-center text-gray-50">
          Hashnode Stats
        </h1>
        <p className="font-mono text-center text-gray-50 text-md">
          This website shows various statistics of{" "}
          <a
            href="https://hashnode.com"
            rel="noreferrer"
            target="_blank"
            className="font-bold hover:underline"
          >
            hashnode
          </a>{" "}
          users like bio information, posts etc.
        </p>
        <p className="font-mono text-center text-gray-50 text-md">
          This project is open-source, feel free to star and contribute on{" "}
          <a
            href="https://github.com/avneesh0612/hashnode-analytics"
            className="font-bold hover:underline"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          !
        </p>
        <input
          value={user}
          onChange={e => setUser(e.target.value)}
          className="p-2 font-mono bg-blue-200 border-blue-400 rounded-lg w-60 focus:border-2 focus:outline-none"
          type="text"
          placeholder="username"
        />
        <Link href={`/${user}`} passHref>
          <button className="font-mono text-center px-3 p-1 bg-blue-200 rounded-full hover:bg-blue-100">
            Go to user&apos;s dashboard
          </button>
        </Link>
      </form>
    </div>
  );
}
