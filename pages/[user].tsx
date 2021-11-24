import Head from "next/head";
import Post from "../components/Post";
import { PostType } from "../types/PostType";
import Image from "next/image";

interface Props {
  data: {
    data: {
      user: {
        username: string;
        numFollowing: string;
        numFollowers: string;
        numReactions: string;
        name: string;
        photo: string;
        publicationDomain: string;
        publication: {
          posts: [PostType];
        };
      };
    };
  };
}

const UserDashboard: React.FC<Props> = ({ data }) => {
  return (
    <div className="min-w-screen max-w-screen bg-[#222E50] min-h-screen flex items-center flex-col">
      <Head>
        <title>Dashboard for {data.data.user.name}</title>
      </Head>
      <h1 className="text-3xl font-semibold text-gray-50">User Dashboard</h1>
      <div className="relative h-24 w-24 rounded-full">
        <Image
          layout="fill"
          className="rounded-full"
          src={data.data.user.photo}
          alt={data.data.user.name}
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-center font-medium text-gray-50 text-2xl">
          Account
        </h2>

        <div className="flex text-white">
          <p className="bg-white/5 p-2 rounded-lg m-1">
            Followers: {data.data.user.numFollowers}
          </p>
          <p className="bg-white/5 p-2 rounded-lg m-1">
            Following: {data.data.user.numFollowing}
          </p>
          <p className="bg-white/5 p-2 rounded-lg m-1">
            Total Reactions: {data.data.user.numReactions}
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-center font-medium text-gray-50 text-2xl">
          Your posts
        </h2>
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 mt-10">
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
