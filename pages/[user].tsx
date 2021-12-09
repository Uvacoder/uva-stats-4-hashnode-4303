import { NextSeo } from "next-seo";
import Image from "next/image";
import Header from "../components/Header";
import Post from "../components/Post";
import Socials from "../components/Socials";
import { PostType } from "../types/PostType";
import { UserType } from "../types/UserType";

interface Props {
  data: {
    data: {
      user: UserType;
    };
  };
}

const UserDashboard: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col items-center min-h-screen p-10 pb-10 min-w-screen max-w-screen">
      {data.data.user.username ? (
        <>
          <NextSeo
            title={`Dashboard for ${data.data.user.name}`}
            canonical={`https://hashnode-stats.vercel.app/${data.data.user.username}`}
          />

          <Header />

          <a
            target="_blank"
            rel="noreferrer"
            href={`https://hashnode.com/@${data.data.user.username}`}
            className="relative w-40 h-40 rounded-full"
          >
            <Image
              layout="fill"
              className="rounded-full"
              objectFit="cover"
              src={data.data.user.photo}
              alt={data.data.user.name}
            />
          </a>
          <div className="flex flex-col">
            <h2 className="text-2xl font-medium text-center dark:text-gray-50 text-[#1B1A28]">
              Account
            </h2>

            <div className="flex">
              <p className="py-2 px-4 m-1 rounded-lg text-[#1B1A28] dark:text-gray-50  dark:bg-[#232626] bg-[#00A7FF]">
                Followers: {data.data.user.numFollowers}
              </p>
              <p className="py-2 px-4 m-1 rounded-lg text-[#1B1A28] dark:text-gray-50  dark:bg-[#232626] bg-[#00A7FF]">
                Following: {data.data.user.numFollowing}
              </p>
              <p className="py-2 px-4 m-1 rounded-lg  text-[#1B1A28] dark:text-gray-50 dark:bg-[#232626] bg-[#00A7FF]">
                Total Reactions: {data.data.user.numReactions}
              </p>
              <p className="py-2 px-4 m-1 rounded-lg text-[#1B1A28] dark:text-gray-50  dark:bg-[#232626] bg-[#00A7FF]">
                Total Posts: {data.data.user.numPosts}
              </p>
            </div>
          </div>

          <Socials
            socials={data.data.user.socialMedia}
            hashnode={`https://hashnode.com/@${data.data.user.username}`}
          />

          <div className="flex flex-col">
            <h2 className="mt-10 text-2xl font-medium text-center text-[#1B1A28] dark:text-gray-50">
              Recent posts
            </h2>
            <div className="flex flex-col flex-wrap md:flex-row">
              {data?.data?.user?.publication?.posts
                ?.slice(0, 3)
                .map((post: PostType) => (
                  <Post
                    publicationDomain={data.data.user.publicationDomain}
                    key={post._id}
                    post={post}
                  />
                ))}
            </div>
          </div>
        </>
      ) : (
        <h1 className="mt-10 text-3xl font-semibold text-[#1B1A28] dark:text-gray-50">
          User not found
        </h1>
      )}
    </div>
  );
};

export default UserDashboard;

export async function getServerSideProps(context: any) {
  const userName = context.query.user;

  const query = `
   {
  user(username: "${userName}") {
    username
    numFollowing
    numFollowers
    numReactions
    name
    photo
    publicationDomain
    numPosts
    socialMedia {
      twitter
      github
      linkedin
      website
      facebook
      stackoverflow
    }
    publication {
      posts(page: 0) {
        _id
        title
        brief
        slug
        coverImage
        totalReactions
        replyCount
        responseCount
        popularity
      }
    }
  }
}

`;

  const hashnodeFollowers = await fetch("https://api.hashnode.com", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const ApiResponse = await hashnodeFollowers.json();

  return {
    props: {
      data: ApiResponse,
    },
  };
}
