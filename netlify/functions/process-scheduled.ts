export default async (req: Request) => {
  try {
    const baseUrl = process.env.URL || 'http://localhost:3000'

    // Call the Next.js API route to process scheduled posts
    const response = await fetch(`${baseUrl}/api/cron/process-scheduled`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.CRON_SECRET || 'secret'}`,
      }
    })

    const data = await response.json()

    return new Response(JSON.stringify({
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        processed: data.processed || 0,
        message: 'Scheduled posts processed'
      })
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error: any) {
    console.error('Cron execution error:', error)
    return new Response(JSON.stringify({
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const config = {
  schedule: '@hourly'
}
