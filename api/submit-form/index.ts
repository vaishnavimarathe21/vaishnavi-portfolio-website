import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Get Slack webhook URL from environment variables
    const slackWebhookUrl = process.env.VITE_SLACK_WEBHOOK_URL

    if (!slackWebhookUrl) {
      console.error('Slack webhook URL not configured')
      return res.status(500).json({ message: 'Server configuration error' })
    }

    // Format message for Slack
    const slackMessage = {
      text: `New contact form submission from ${name}`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📧 New Contact Form Submission'
          }
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Name:*\n${name}`
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${email}`
            },
            {
              type: 'mrkdwn',
              text: `*Subject:*\n${subject}`
            },
            {
              type: 'mrkdwn',
              text: `*Message:*\n${message}`
            }
          ]
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `📅 Submitted at: ${new Date().toLocaleString()}`
            }
          ]
        }
      ]
    }

    // Send to Slack
    const slackResponse = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    })

    if (!slackResponse.ok) {
      console.error('Failed to send message to Slack:', await slackResponse.text())
      return res.status(500).json({ message: 'Failed to send message' })
    }

    // Send success response
    res.status(200).json({ 
      message: 'Message sent successfully!',
      success: true 
    })

  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({ 
      message: 'Internal server error',
      success: false 
    })
  }
}
