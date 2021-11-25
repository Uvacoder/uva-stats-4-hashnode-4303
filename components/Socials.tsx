import {
  GitHubIcon,
  GlobeIcon,
  HashnodeIcon,
  LinkedInIcon,
  TwitterIcon,
} from "./icons";
import { SocialTypes } from "../types/SocialTypes";

interface Props {
  socials: SocialTypes;
  hashnode: string;
}

const Socials: React.FC<Props> = ({ socials, hashnode }) => {
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-2xl text-center text-gray-50 my-3">
        Social Media
      </h2>
      <div className="flex">
        {socials.twitter.length > 0 && (
          <a
            className="mx-3"
            href={socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="w-12 h-12 p-1 rounded-md text-gray-50 fill-current bg-white/5" />
          </a>
        )}
        {socials.github.length > 0 && (
          <a
            className="mx-3"
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="w-12 h-12 p-1 rounded-md text-gray-50 fill-current bg-white/5" />
          </a>
        )}
        {socials.linkedin.length > 0 && (
          <a
            className="mx-3"
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon className="w-12 h-12 p-1 rounded-md text-gray-50 fill-current bg-white/5" />
          </a>
        )}
        {socials.website.length > 0 && (
          <a
            className="mx-3"
            href={socials.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlobeIcon className="w-12 h-12 p-1 rounded-md text-gray-50 fill-current bg-white/5" />
          </a>
        )}
        <a
          className="mx-3"
          href={hashnode}
          target="_blank"
          rel="noopener noreferrer"
        >
          <HashnodeIcon className="w-12 h-12 p-1 rounded-md text-gray-50 fill-current bg-white/5" />
        </a>
      </div>
    </div>
  );
};

export default Socials;
