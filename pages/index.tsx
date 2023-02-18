import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";

import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [user, setUser] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    user
      ? toast.promise(router.push(`/${user}`), {
          loading: "Coming up...",
          success: "Success!",
          error: "Something went wrong!",
        })
      : toast.error("Please add an input");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-left" />
      <Head>
        <title>Stats 4 Hash</title>
      </Head>
      <Header />

      <form
        className="flex flex-col items-center space-y-2"
        onSubmit={handleSubmit}
      >
        <h1 className="font-mono text-2xl font-extrabold text-center text-gray-50">
          Stats-4-Hash
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
            href="https://github.com/uvacoder/uva-stats-4-hashnode-4303"
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
        <button
          className="p-1 px-3 my-2 font-mono text-center bg-blue-200 rounded-full hover:bg-blue-100"
          type="submit"
        >
          Go to user&apos;s dashboard
        </button>
      </form>
    </div>
  );
}
