import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Get all users
// POST /api/user/
export async function GET(req) {
  const { searchParams } = req.nextUrl

  // Get count of all users
  const totalCount = await prisma.users.count()

  // Get skip and take from query params
  const skip = searchParams.get('skip')
  const take = searchParams.get('take')

  const getUsers = await prisma.users.findMany({
    skip: skip ? Number(skip) : 0,
    take: take ? Number(take) : totalCount,
    include: {
      user_roles: {
        select: {
          role_name: true,
        },
      },
    },
    orderBy: {
      role_id: 'desc',
    },
  })

  return NextResponse.json({
    data: getUsers,
    result_count: getUsers.length,
    total_count: totalCount,
  })
}

// Select user by email
// POST /api/user/
export async function POST(req) {
  let body = await req.json()

  const postUser = await prisma.users.findUnique({
    where: { email: body.email },
    include: {
      user_roles: {
        select: {
          id: true,
          role_name: true,
        },
      },
    },
  })

  return NextResponse.json(postUser)
}
