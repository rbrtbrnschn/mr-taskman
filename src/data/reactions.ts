import { ReactionKey } from "../interfaces/Config";

const reactions: { [index in ReactionKey]: string[] } = {
  good: ["👍", "👌", "☝️", "💯", "❤️"],
  error: ["☹️", "😭", "😢", "💔"],
};

export = reactions;
