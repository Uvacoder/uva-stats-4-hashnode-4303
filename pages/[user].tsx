import { NextSeo } from "next-seo";
import Image from "next/image";
import Header from "../components/Header";
import Post from "../components/Post";
import Socials from "../components/Socials";
import { PostType } from "../types/PostType";
import { UserType } from "../types/UserType";
import getUserData from "../utils/getUserData";
import getUserPosts from "../utils/getUserPosts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const [userData, setUserData] = useState<UserType | null>();
  const [postsData, setPostsData] = useState<PostType[] | null>();
  const [recentPostsData, setRecentPostsData] = useState<PostType[] | null>();

  const router = useRouter();
  const { user } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setUserData(await getUserData(user as string));
        const posts = await getUserPosts(user as string);
        setRecentPostsData(posts as PostType[]);

        const comparePostData = (post1: PostType, post2: PostType) => {
          if (post1.totalReactions < post2.totalReactions) {
            return 1;
          } else if (post1.totalReactions > post2.totalReactions) {
            return -1;
          } else {
            return 0;
          }
        };

        const topPosts = posts.sort(comparePostData);
        setPostsData(topPosts);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="flex flex-col items-center min-h-screen p-10 pb-10 min-w-screen max-w-screen">
      {userData && postsData && recentPostsData ? (
        userData.username && (
          <>
            <NextSeo
              title={`Dashboard for ${userData.name}`}
              canonical={`https://hashnode-stats.vercel.app/${userData.username}`}
            />

            <Header />

            <a
              target="_blank"
              rel="noreferrer"
              href={`https://hashnode.com/@${userData.username}`}
              className="relative w-40 h-40 rounded-full"
            >
              <Image
                layout="fill"
                className="rounded-full"
                objectFit="cover"
                src={userData.photo}
                alt={userData.name}
              />
            </a>
            <div className="flex flex-col">
              <h2 className="text-2xl font-medium text-center dark:text-gray-50 text-[#1B1A28]">
                Account
              </h2>

              <div className="flex">
                <p className="py-2 px-4 m-1 rounded-lg text-[#1B1A28] dark:text-gray-50  dark:bg-[#232626] bg-[#00A7FF]">
                  Followers: {userData.numFollowers}
                </p>
                <p className="py-2 px-4 m-1 rounded-lg text-[#1B1A28] dark:text-gray-50  dark:bg-[#232626] bg-[#00A7FF]">
                  Following: {userData.numFollowing}
                </p>
                <p className="py-2 px-4 m-1 rounded-lg  text-[#1B1A28] dark:text-gray-50 dark:bg-[#232626] bg-[#00A7FF]">
                  Total Reactions: {userData.numReactions}
                </p>
                <p className="py-2 px-4 m-1 rounded-lg text-[#1B1A28] dark:text-gray-50  dark:bg-[#232626] bg-[#00A7FF]">
                  Total Posts: {userData.numPosts}
                </p>
              </div>
            </div>

            <Socials
              socials={userData.socialMedia}
              hashnode={`https://hashnode.com/@${userData.username}`}
            />

            <div className="flex flex-col">
              <h2 className="mt-10 text-2xl font-medium text-center text-[#1B1A28] dark:text-gray-50">
                Recent posts
              </h2>
              <div className="flex flex-col flex-wrap md:flex-row">
                {recentPostsData.slice(0, 3).map((post: PostType) => (
                  <Post
                    publicationDomain={userData.publicationDomain}
                    key={post._id}
                    post={post}
                  />
                ))}
              </div>

              <h2 className="mt-10 text-2xl font-medium text-center text-[#1B1A28] dark:text-gray-50">
                Top posts
              </h2>
              <div className="flex flex-col flex-wrap md:flex-row">
                {postsData.slice(0, 3).map((post: PostType) => (
                  <Post
                    publicationDomain={userData.publicationDomain}
                    key={post._id}
                    post={post}
                  />
                ))}
              </div>
            </div>
          </>
        )
      ) : (
        <h1 className="mt-10 text-3xl font-semibold text-[#1B1A28] dark:text-gray-50">
          Loading...
        </h1>
      )}
    </div>
  );
};

export default UserDashboard;
