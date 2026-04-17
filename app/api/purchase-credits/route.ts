import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory credit system (use database in production)
const userCredits: Record<string, number> = {}

export async function POST(request: NextRequest) {
  try {
    const { action, userId, amount, package: creditPackage } = await request.json()

    if (action === 'get') {
      return NextResponse.json({
        credits: userCredits[userId] || 0
      })
    }

    if (action === 'purchase') {
      const packages: Record<string, { credits: number; price: number }> = {
        starter: { credits: 10, price: 9.99 },
        pro: { credits: 50, price: 39.99 },
        unlimited: { credits: 999, price: 99.99 }
      }

      const pkg = packages[creditPackage]
      if (!pkg) {
        return NextResponse.json(
          { error: 'Invalid package' },
          { status: 400 }
        )
      }

      // In production: integrate with Stripe/payment processor
      // For now: simulate purchase
      userCredits[userId] = (userCredits[userId] || 0) + pkg.credits

      return NextResponse.json({
        success: true,
        message: `Purchased ${pkg.credits} credits`,
        newBalance: userCredits[userId],
        price: pkg.price
      })
    }

    if (action === 'use') {
      const current = userCredits[userId] || 0
      if (current < amount) {
        return NextResponse.json(
          { error: 'Insufficient credits' },
          { status: 400 }
        )
      }

      userCredits[userId] = current - amount

      return NextResponse.json({
        success: true,
        message: `Used ${amount} credits`,
        newBalance: userCredits[userId]
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error: any) {
    console.error('Credit system error:', error)
    return NextResponse.json(
      { error: error.message || 'Credit system error' },
      { status: 500 }
    )
  }
}
