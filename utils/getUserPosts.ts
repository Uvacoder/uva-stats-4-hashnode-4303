import { PostType } from "../types/PostType";

const getuserPosts = async (username: string) => {
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

  let loadMoreData = true;
  let i = 0;
  let posts: PostType[] = [];

  while (loadMoreData) {
    const userPostsRes = await fetch("https://api.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: postDataQuery,
        variables: { username: username, page: i },
      }),
    });

    const userPostsJson = await userPostsRes.json();

    if (userPostsJson.data) {
      if (userPostsJson.data.user) {
        if (userPostsJson.data.user.publication) {
          if (userPostsJson.data.user.publication.posts.length > 0) {
            posts = posts.concat(userPostsJson.data.user.publication.posts);
            i++;
          } else {
            loadMoreData = false;
          }
        }
      }
    }
  }

  return posts;
};

export default getuserPosts;
