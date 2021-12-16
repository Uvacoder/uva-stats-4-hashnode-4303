import { PostType } from "../types/PostType";

const postDataQuery = `
query($username: String!, $page: Int) {
  user(username: $username) {
    publication {
      posts(page: $page) {
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

const getAllPosts = async (username: string, page = 0): Promise<PostType[]> => {
  const cache = localStorage.getItem("cachedPosts");

  if (cache && cache.time + 43200000 > new Date().getTime()) {
    return cache.ret;
  }

  const { data } = await fetch("https://api.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: postDataQuery,
      variables: { username, page },
    }),
  }).then(res => res.json());

  const postLength = data?.user?.publication?.posts?.length;

  let ret;

  if (postLength && postLength > 0) {
    ret = data.user.publication.posts.concat(
      await getAllPosts(username, page + 1)
    );
  } else {
    ret = data.user.publication.posts;
  }

  localStorage.setItem(
    "cachedPosts",
    JSON.stringify({ ret, time: new Date().getTime() })
  );

  return ret;
};

const getTopPosts = async (username: string) => {
  const posts = await getAllPosts(username);

  const comparePostData = (
    { totalReactions: reactions1 }: PostType,
    { totalReactions: reactions2 }: PostType
  ) => reactions1 - reactions2;
  const topPosts = posts.sort(comparePostData);

  return topPosts;
};

export default getTopPosts;
