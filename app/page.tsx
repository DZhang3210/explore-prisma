import { createPost } from "@/actions/actions";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany({
    // where: {
    //   title: {
    //     contains: 'first'
    //   },
    // },
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      title: true,
      slug: true
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      email: "davidzhang3210@gmail.com",
    },
    include: {
      posts: true,
    }
  })

  return (
    <main>
      <h1>All Posts {user?.posts.length}</h1>
      {posts.map((post) => (
        <li key={post.id} className="flex items-center justify-between px-5">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
      <form
        className="flex flex-col gap-y-2 w-[300px]"
        action={createPost}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="px-2 py-1 rounded-sm"
        />
        <textarea
          name="content"
          rows={5}
          placeholder="Content"
          className="px-2 py-1 rounded-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 py-2 text-white rounded-sm"
        >
          Create Post
        </button>
      </form>
    </main>
  );
}
