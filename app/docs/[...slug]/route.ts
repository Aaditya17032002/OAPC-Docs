import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const docsDirectory = path.join(process.cwd(), 'docs')

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  try {
    const { slug } = params
    
    // Construct the file path - always add .md extension
    const filePath = path.join(docsDirectory, ...slug) + '.md'
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 })
    }
    
    // Read the file
    const content = fs.readFileSync(filePath, 'utf8')
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Error serving markdown file:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
