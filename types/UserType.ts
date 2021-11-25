import { PostType } from "./PostType";
import { SocialTypes } from "./SocialTypes";

export type UserType = {
  username: string;
  numFollowing: string;
  numFollowers: string;
  numReactions: string;
  name: string;
  photo: string;
  publicationDomain: string;
  socialMedia: SocialTypes;
  publication: {
    posts: [PostType];
  };
};
