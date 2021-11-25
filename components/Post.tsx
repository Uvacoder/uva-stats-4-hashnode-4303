import Image from "next/image";
import { PostType } from "../types/PostType";
import { CommentIcon, LikeIcon } from "./icons";

interface Props {
  post: PostType;
  publicationDomain: string;
}

const Post: React.FC<Props> = ({ post, publicationDomain }) => {
  return (
    <a
      href={`https://${publicationDomain}/${post.slug}`}
      key={post._id}
      target="_blank"
      rel="noreferrer"
      className="flex rounded-lg my-5 md:mb-0 md:mx-5 mt-5 flex-col relative w-96 bg-white/5 "
    >
      {post.coverImage && (
        <Image
          objectFit="cover"
          width={1500}
          height={786}
          className="rounded-lg"
          src={post.coverImage}
          alt={post.title}
        />
      )}

      <div className="flex flex-col p-4 pb-0">
        <h2 className="font-semibold text-2xl text-gray-50">{post.title}</h2>
        <p className="text-base text-gray-50 break-words">{post.brief}</p>
      </div>
      <div className="flex p-4 w-full justify-between">
        <div className="flex">
          <LikeIcon className="w-6 h-6 mr-2 text-gray-50 fill-current" />
          <p className="text-gray-50">{post.totalReactions}</p>
        </div>
        <div className="flex">
          <CommentIcon className="w-6 h-6 mr-2 text-gray-50 fill-current" />
          <p className="text-gray-50">{post.replyCount + post.responseCount}</p>
        </div>
      </div>
    </a>
  );
};

export default Post;
