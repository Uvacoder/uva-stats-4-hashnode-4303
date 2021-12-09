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
        <title>Create Next App</title>
      </Head>
      <Header />

      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        <input
          value={user}
          onChange={e => setUser(e.target.value)}
          className="p-2 bg-blue-200 border-blue-400 rounded-lg focus:border-2 focus:outline-none"
          type="text"
          placeholder="username"
        />
        <Link href={`/${user}`} passHref>
          <a className="text-center text-gray-50">
            Go to user&apos;s dashboard
          </a>
        </Link>
      </form>
    </div>
  );
}
