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
      <h2 className="my-3 text-2xl font-semibold text-center dark:text-gray-50 text-[#1B1A28]:text-gray-50">
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
            <TwitterIcon className="w-12 h-12 p-3 rounded-md fill-current text-[#1B1A28] dark:text-gray-50 dark:bg-[#232626] bg-[#00A7FF] " />
          </a>
        )}
        {socials.github.length > 0 && (
          <a
            className="mx-3"
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="w-12 h-12 p-3 rounded-md fill-current text-[#1B1A28] dark:text-gray-50 dark:bg-[#232626] bg-[#00A7FF] " />
          </a>
        )}
        {socials.linkedin.length > 0 && (
          <a
            className="mx-3"
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon className="w-12 h-12 p-3 rounded-md fill-current text-[#1B1A28] dark:text-gray-50 dark:bg-[#232626] bg-[#00A7FF] " />
          </a>
        )}
        {socials.website.length > 0 && (
          <a
            className="mx-3"
            href={socials.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlobeIcon className="w-12 h-12 p-3 rounded-md fill-current text-[#1B1A28] dark:text-gray-50 dark:bg-[#232626] bg-[#00A7FF] " />
          </a>
        )}
        <a
          className="mx-3"
          href={hashnode}
          target="_blank"
          rel="noopener noreferrer"
        >
          <HashnodeIcon className="w-12 h-12 p-3 rounded-md fill-current text-[#1B1A28] dark:text-gray-50 dark:bg-[#232626] bg-[#00A7FF] " />
        </a>
      </div>
    </div>
  );
};

export default Socials;
