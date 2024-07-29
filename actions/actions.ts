'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
    try {
        console.log(formData)
        await prisma.post.create({
            data: {
                title: formData.get("title") as string,
                slug: (formData.get('title') as string)
                    .replace(/\s+/g, "-")
                    .toLowerCase(),
                content: formData.get('content') as string,
                author: {
                    connect: {
                        email: "davidzhang3210@gmail.com"
                    }
                }
            }
        })
        console.log("here")
        revalidatePath('/')
    }
    catch (error) {
        console.log("failing cause", error)
    }
}