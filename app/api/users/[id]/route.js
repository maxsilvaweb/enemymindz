import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get user by uuid (id in database)
// GET /api/users/[id]
export async function GET(req, { params }) {
  const getUser = await prisma.users.findUnique({
    where: { id: params.id },
    include: {
      user_roles: {
        select: {
          id: true,
          role_name: true,
        },
      },
    },
  });

  return NextResponse.json(getUser);
}

// Update user by id
// PUT /api/users/[id]
export async function PUT(req, { params }) {
  let body = await req.json();
  delete body.email;

  const putUser = await prisma.users.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(putUser);
}
