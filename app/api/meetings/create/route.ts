import { NextResponse } from 'next/server';

function generateMeetingCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  const part = (length: number) =>
    Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join('');

  return `${part(4)}-${part(4)}`;
}

export async function POST() {
  const code = generateMeetingCode();

  return NextResponse.json({
    meetingCode: code,
    channelName: `classroom-${code}`,
  });
}