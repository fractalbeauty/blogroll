import { z } from "astro:content";
import { parse as parseToml } from "smol-toml";
import blogsToml from "../public/blogs.toml?raw";

const feedsSchema = z.object({
  feed: z.array(
    z.object({
      title: z.string(),
      site: z.string().url(),
      url: z.string().url(),
    })
  ),
});

export const BLOGS = feedsSchema.parse(parseToml(blogsToml)).feed;
