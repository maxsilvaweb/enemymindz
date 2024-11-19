import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all links for a given uuid
// GET /api/booking/[uuid]
export async function GET(req, { params }) {
  const { searchParams } = req.nextUrl;

  // Get count of links
  const totalCount = await prisma.bookings.count();

  // Get skip and take from query params
  const skip = searchParams.get('skip');
  const take = searchParams.get('take');

  const getBookings = await prisma.links.findMany({
    skip: skip ? Number(skip) : 0,
    take: take ? Number(take) : totalCount,
    where: { id: params.id },
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
