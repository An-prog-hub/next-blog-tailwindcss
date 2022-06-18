import React from "react";
import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import Image from "next/image";

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
  console.log(frontMatter);
  console.log(content);
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <p>{frontMatter.metaDesc}</p>
      <Image src={frontMatter.socialImage} width="200px" height="200px"/>
      <article dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  );
};

export default BlogPage;
