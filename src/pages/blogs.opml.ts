import type { APIRoute } from "astro";
import { BLOGS } from "../data";

export const GET: APIRoute = async () => {
  let res = "";
  res += '<?xml version="1.0" encoding="UTF-8"?>';
  res += '<opml version="1.0">';
  res += "<head>";
  res += "<title>blogs</title>";
  res += "</head>";
  res += "<body>";
  BLOGS.forEach((blog) => {
    res += `<outline type="rss" text="${blog.title}" htmlUrl="${blog.site}" xmlUrl="${blog.url}"/>`;
  });
  res += "</body>";
  res += "</opml>";

  return new Response(res, { headers: { "Content-Type": "application/xml" } });
};
