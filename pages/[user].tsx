import Image from "next/image";
import Head from "next/head";

interface Props {
  data: {
    data: {
      user: {
        username: string;
        publicationDomain: string;
        publication: {
          posts: [PostType];
        };
      };
    };
  };
}

interface PostType {
  _id: string;
  title: string;
  content: string;
  brief: string;
  totalReactions: string;
  replyCount: string;
  responseCount: string;
  coverImage: string;
  slug: string;
}

const UserDashboard: React.FC<Props> = ({ data }) => {
  return (
    <div className="min-w-screen max-w-screen bg-[#222E50] min-h-screen flex items-center flex-col">
      <Head>
        <title>Dashboard for {data.data.user.username}</title>
      </Head>
      <h1 className="text-3xl font-semibold text-gray-50">User Dashboard</h1>

      <div className="flex flex-col">
        <h2 className="text-center font-medium text-gray-50 text-2xl">
          Your posts
        </h2>
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 mt-10">
          {data?.data?.user?.publication?.posts
            ?.slice(0, 3)
            .map((post: PostType) => (
              <a
                href={`https://${data.data.user.publicationDomain}/${post.slug}`}
                key={post._id}
                target="_blank"
                rel="noreferrer"
                className="flex rounded-lg flex-col relative w-96 bg-white/5 h-[490px]"
              >
                <Image
                  objectFit="cover"
                  width={1500}
                  height={786}
                  className="rounded-lg "
                  src={post.coverImage}
                  alt={post.title}
                />

                <div className="flex flex-col p-4 pb-0">
                  <h2 className="font-semibold text-2xl text-gray-50">
                    {post.title}
                  </h2>
                  <p className="text-base text-gray-50 break-words">
                    {post.brief}
                  </p>
                </div>
                <div className="flex p-4 absolute bottom-2 w-full justify-between">
                  <div className="flex">
                    <svg
                      className="w-6 h-6 mr-2 text-gray-50 fill-current"
                      viewBox="0 0 512 512"
                    >
                      <path d="M496.656 285.683C506.583 272.809 512 256 512 235.468c-.001-37.674-32.073-72.571-72.727-72.571h-70.15c8.72-17.368 20.695-38.911 20.695-69.817C389.819 34.672 366.518 0 306.91 0c-29.995 0-41.126 37.918-46.829 67.228-3.407 17.511-6.626 34.052-16.525 43.951C219.986 134.75 184 192 162.382 203.625c-2.189.922-4.986 1.648-8.032 2.223C148.577 197.484 138.931 192 128 192H32c-17.673 0-32 14.327-32 32v256c0 17.673 14.327 32 32 32h96c17.673 0 32-14.327 32-32v-8.74c32.495 0 100.687 40.747 177.455 40.726 5.505.003 37.65.03 41.013 0 59.282.014 92.255-35.887 90.335-89.793 15.127-17.727 22.539-43.337 18.225-67.105 12.456-19.526 15.126-47.07 9.628-69.405zM32 480V224h96v256H32zm424.017-203.648C472 288 472 336 450.41 347.017c13.522 22.76 1.352 53.216-15.015 61.996 8.293 52.54-18.961 70.606-57.212 70.974-3.312.03-37.247 0-40.727 0-72.929 0-134.742-40.727-177.455-40.727V235.625c37.708 0 72.305-67.939 106.183-101.818 30.545-30.545 20.363-81.454 40.727-101.817 50.909 0 50.909 35.517 50.909 61.091 0 42.189-30.545 61.09-30.545 101.817h111.999c22.73 0 40.627 20.364 40.727 40.727.099 20.363-8.001 36.375-23.984 40.727zM104 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"></path>
                    </svg>
                    <p className="text-gray-50">{post.totalReactions}</p>
                  </div>
                  <div className="flex">
                    <svg
                      className="fill-current text-gray-50 mr-2 w-6 h-6"
                      viewBox="0 0 512 512"
                    >
                      <path d="M280 272H136c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h144c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm96-96H136c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 384c-28.3 0-56.3-4.3-83.2-12.8l-15.2-4.8-13 9.2c-23 16.3-58.5 35.3-102.6 39.6 12-15.1 29.8-40.4 40.8-69.6l7.1-18.7-13.7-14.6C47.3 313.7 32 277.6 32 240c0-97 100.5-176 224-176s224 79 224 176-100.5 176-224 176z"></path>
                    </svg>
                    <p className="text-gray-50">
                      {post.replyCount + post.responseCount}
                    </p>
                  </div>
                </div>
              </a>
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
