import React from "react";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import Image from "next/image";
import Link from "next/link";

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  // get content for each post
  const mdfile = fs.readFileSync(`posts/${slug}.md`);
  const { data: frontMatter, content } = matter(mdfile);

  return {
    props: {
      frontMatter,
      content,
    },
  };
}

const BlogPage = ({ frontMatter, content }) => {
  //   console.log(frontMatter);
  //   console.log(content);
  return (
    <>
      <Link href="/">
        <div className="p-5">
          <span className="cursor-pointer">back</span>
        </div>
      </Link>
      <div className="container p-10">
        <h1 className="font-medium text-3xl pb-10">{frontMatter.title}</h1>
        <p className="font-small">{frontMatter.metaDesc}</p>
        <div className="flex justify-center p-10">
          <Image src={frontMatter.socialImage} width="500px" height="500px" />
        </div>
        <article dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </div>
    </>
  );
};

export default BlogPage;
