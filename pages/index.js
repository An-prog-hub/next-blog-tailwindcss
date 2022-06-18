import fs from "fs"; // used to interact with file system
import matter from "gray-matter";
import Link from "next/link";

export async function getStaticProps() {
  // get the post from here!
  const files = fs.readdirSync("posts");
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const readFiles = fs.readFileSync(`posts/${filename}`);
    const { data: frontMatter } = matter(readFiles);
    return {
      slug,
      frontMatter,
    };
  });
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div className="container">
      <h1 className="font-medium leading-tight text-4xl mt-0 mb-2 flex justify-center pt-5">
        Welcome to our blog!
      </h1>
      <div className="p-10">
        {posts?.map((post) => {
          return (
            <Link key={`${post.slug}`} href={`/blog/${post.slug}`}>
              <a>
                <div className="mb-4">
                  <h1 className="text-xl py-3">{post.frontMatter.title}</h1>
                  <p>{post.frontMatter.metaTitle}</p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
