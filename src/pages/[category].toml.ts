import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import fs from "fs/promises";

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

  const content = await fs.readFile(`./feeds/${params.category}.toml`);
  return new Response(content, {
    headers: {
      "Content-Type": "text/toml",
    },
  });
};
