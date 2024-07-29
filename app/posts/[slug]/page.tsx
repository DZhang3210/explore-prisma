import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";

type Params = {
    params: {
        slug: string
    }
}

export default async function page({ params }) {
    const post = await prisma.post.findUnique(
        {
            where: {
                slug: params.slug
            }
        });
    return (
        <main>
            <h1>{post?.title}</h1>
            <p>
                {post?.content}
            </p>

        </main>
    );
}