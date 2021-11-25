import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/${user}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#222E50]">
      <Head>
        <title>Create Next App</title>
      </Head>
      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="bg-blue-200 p-2 rounded-lg focus:border-2 border-blue-400 focus:outline-none"
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
