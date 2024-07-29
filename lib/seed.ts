import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const initialPosts: Prisma.PostCreateInput[] = [
    {
        title: 'Post 1',
        slug: 'Post-1',
        content: 'Content of post 1',
        author: {
            connectOrCreate: {
                where: {
                    email: "john@gmail.com"
                },
                create: {
                    email: "john@gmail.com",
                    hashedPassword: "adjfasjidnasufoodaicmokisldf",
                }
            }
        }
    }
]
async function main() {
    console.log('start seeding...')
    for (const post of initialPosts) {
        const newPost = await prisma.post.create({
            data: post,
        })

        console.log(`Created post with id:${newPost.id}`)
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })