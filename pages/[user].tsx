import { NextSeo } from "next-seo";
import Image from "next/image";
import Header from "../components/Header";
import Post from "../components/Post";
import Socials from "../components/Socials";
import { PostType } from "../types/PostType";
import { UserType } from "../types/UserType";
import getUserPosts from "../utils/getTopPosts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getUserDataAndPosts from "../utils/getUserDataAndPosts";
import { CommentIcon, LikeIcon } from "../components/icons";

interface Props {
  userDataAndPosts: UserType;
}

const UserDashboard = ({ userDataAndPosts }: Props) => {
  const [topPostsData, setTopPostsData] = useState<PostType[] | null>();

  const router = useRouter();
  const { user } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const topPosts = await getUserPosts(user as string);

        setTopPostsData(topPosts);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="flex flex-col items-center min-h-screen p-10 pb-10 min-w-screen max-w-screen">
      {userDataAndPosts?.username ? (
        <>
          <NextSeo
            title={`Dashboard for ${userDataAndPosts.name}`}
            canonical={`https://hashnode-stats.vercel.app/${userDataAndPosts.username}`}
          />

          <Header />

          <a
            target="_blank"
            rel="noreferrer"
            href={`https://hashnode.com/@${userDataAndPosts.username}`}
            className="relative w-40 h-40 rounded-full"
          >
            <Image
              layout="fill"
              className="rounded-full"
              objectFit="cover"
              src={userDataAndPosts.photo}
              alt={userDataAndPosts.name}
            />
          </a>
          <div className="flex flex-col mt-4 mb-4">
            <h2 className="text-2xl font-semibold text-center dark:text-gray-50 text-[#1B1A28]">
              Account
            </h2>

            <div className="flex mt-4">
              <p className="py-2 px-4 m-1 rounded-lg text-[#1B1A28] dark:text-gray-50  dark:bg-[#232626] bg-[#00A7FF]">
                Followers: {userDataAndPosts.numFollowers}
              </p>
              <p className="py-2 px-4 m-1 rounded-lg text-[#1B1A28] dark:text-gray-50  dark:bg-[#232626] bg-[#00A7FF]">
                Following: {userDataAndPosts.numFollowing}
              </p>
              <p className="py-2 px-4 m-1 rounded-lg  text-[#1B1A28] dark:text-gray-50 dark:bg-[#232626] bg-[#00A7FF]">
                Total Reactions: {userDataAndPosts.numReactions}
              </p>
              <p className="py-2 px-4 m-1 rounded-lg text-[#1B1A28] dark:text-gray-50  dark:bg-[#232626] bg-[#00A7FF]">
                Total Posts: {userDataAndPosts.numPosts}
              </p>
            </div>
          </div>

          <Socials
            socials={userDataAndPosts.socialMedia}
            hashnode={`https://hashnode.com/@${userDataAndPosts.username}`}
          />

          <div className="flex flex-col">
            <h2 className="mt-10 text-2xl font-semibold text-center text-[#1B1A28] dark:text-gray-50">
              Recent posts
            </h2>
            <div className="flex flex-col flex-wrap md:flex-row">
              {userDataAndPosts.publication.posts
                .slice(0, 3)
                .map((post: PostType) => (
                  <Post
                    publicationDomain={userDataAndPosts.publicationDomain}
                    key={post._id}
                    post={post}
                  />
                ))}
            </div>

            <h2 className="mt-10 text-2xl font-semibold text-center text-[#1B1A28] dark:text-gray-50">
              Top posts
            </h2>
            <div className="flex flex-col flex-wrap md:flex-row">
              {topPostsData ? (
                topPostsData
                  .slice(0, 3)
                  .map((post: PostType) => (
                    <Post
                      publicationDomain={userDataAndPosts.publicationDomain}
                      key={post._id}
                      post={post}
                    />
                  ))
              ) : (
                <>
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="relative flex flex-col my-5 mt-5 rounded-lg md:mb-0 h-[500px] md:mx-5 w-96 dark:bg-[#232626] bg-[#00A7FF] "
                    >
                      <div className="flex animate-pulse items-center flex-col h-full w-full rounded-lg">
                        <div className="w-full bg-gray-300 h-52 rounded-lg"></div>
                        <div className="flex flex-col w-full p-4 pb-0">
                          <div className="w-full bg-gray-300 h-14 rounded-md"></div>
                          <div className="w-full mt-2 bg-gray-300 h-40 rounded-md"></div>
                        </div>
                        <div className="flex justify-between w-full p-4 mt-auto">
                          <LikeIcon className="w-6 h-6 mr-2 fill-current text-[#1B1A28] dark:text-gray-50" />
                          <CommentIcon className="w-6 h-6 mr-2 fill-current text-[#1B1A28] dark:text-gray-50" />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <h1 className="mt-10 text-3xl font-semibold text-[#1B1A28] dark:text-gray-50">
          User Not Found
        </h1>
      )}
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const userDataAndPosts = await getUserDataAndPosts(ctx.query.user as string);

  return {
    props: {
      userDataAndPosts: userDataAndPosts,
    },
  };
};

export default UserDashboard;
