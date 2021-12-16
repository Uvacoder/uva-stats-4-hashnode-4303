const getUserDataAndPosts = async (username: string) => {
  const userDataQuery = `
   {
      user(username: "${username}") {
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
  const userDataRes = await fetch("https://api.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query: userDataQuery }),
  });
  const userData = await userDataRes.json();

  return userData.data.user;
};

export default getUserDataAndPosts;
