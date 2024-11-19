import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all bookings
// GET /api/bookings
export async function GET(req) {
  const { searchParams } = req.nextUrl;

  // Get count of all bookings
  const totalCount = await prisma.bookings.count();
  const skip = searchParams.get('skip');
  const take = searchParams.get('take');

  // Query the db for all bookings
  const getLinks = await prisma.bookings.findMany({
    skip: skip ? Number(skip) : 0,
    take: take ? Number(take) : totalCount,
    orderBy: {
      id: 'desc',
    },
  });

  return NextResponse.json({
    data: getBookings,
    result_count: getBookings.length,
    total_count: totalCount,
  });
}

// Create a new booking
// POST /api/bookings
export async function POST(req) {
  let body = await req.json();
  let response = {};

  const requiredKeys = ['uuid', 'campaign_name'];
  const ifKeysExist = requiredKeys.every((key) =>
    Object.keys(body).includes(key)
  );

  // Check if 2 keys exist in the body to determine to create a new link
  // or get a link by uuid and campaign_name
  if (Object.keys(body).length === 2 && ifKeysExist) {
    response = await prisma.links.findMany({
      where: { uuid: body.uuid, campaign_name: body.campaign_name },
    });
  } else {
    response = await prisma.bookings.create({
      data: {
        ...body,
      },
    });
  }

  return NextResponse.json(response);
}
