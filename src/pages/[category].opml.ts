import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const getStaticPaths = async () => {
  const categories = await getCollection("categories");
  return categories.map((category) => ({
    params: {
      category: category.id,
    },
  }));
};

export const GET: APIRoute = async ({ params }) => {
  if (!params.category) throw new Error();

  const category = await getEntry("categories", params.category);
  if (!category) throw new Error();

  let res = "";
  res += '<?xml version="1.0" encoding="UTF-8"?>';
  res += '<opml version="1.0">';
  res += "<head>";
  res += `<title>${category.id}</title>`;
  res += "</head>";
  res += "<body>";
  category.data.forEach((feed) => {
    res += `<outline type="rss" text="${feed.title}" htmlUrl="${feed.site}" xmlUrl="${feed.url}"/>`;
  });
  res += "</body>";
  res += "</opml>";

  return new Response(res, { headers: { "Content-Type": "application/xml" } });
};
