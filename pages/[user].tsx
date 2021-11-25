import { NextSeo } from "next-seo";
import Image from "next/image";
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
    <div className="min-w-screen max-w-screen pb-10 bg-[#222E50] min-h-screen flex items-center flex-col">
      {data.data.user.username ? (
        <>
          <NextSeo
            title={`Dashboard for ${data.data.user.name}`}
            canonical={`https://hashnode-stats.vercel.app/${data.data.user.username}`}
          />
          <h1 className="text-3xl font-semibold text-gray-50">
            User Dashboard
          </h1>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://hashnode.com/@${data.data.user.username}`}
            className="relative w-24 h-24 rounded-full"
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
            <h2 className="text-2xl font-medium text-center text-gray-50">
              Account
            </h2>

            <div className="flex text-gray-50">
              <p className="p-2 m-1 rounded-lg bg-white/5">
                Followers: {data.data.user.numFollowers}
              </p>
              <p className="p-2 m-1 rounded-lg bg-white/5">
                Following: {data.data.user.numFollowing}
              </p>
              <p className="p-2 m-1 rounded-lg bg-white/5">
                Total Reactions: {data.data.user.numReactions}
              </p>
            </div>
          </div>

          <Socials
            socials={data.data.user.socialMedia}
            hashnode={`https://hashnode.com/@${data.data.user.username}`}
          />

          <div className="flex flex-col">
            <h2 className="mt-10 text-2xl font-medium text-center text-gray-50">
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
        <h1 className="mt-10 text-3xl font-semibold text-gray-50">
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
