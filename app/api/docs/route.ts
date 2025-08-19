import { NextResponse } from 'next/server'
import { getAllMarkdownFiles } from '@/lib/markdown'

export async function GET() {
  try {
    const files = getAllMarkdownFiles()
    
    return NextResponse.json({
      files: files.map(file => ({
        slug: file,
        url: `/docs/${file}`,
        rawUrl: `/docs/${file}.md`
      }))
    })
  } catch (error) {
    console.error('Error listing markdown files:', error)
    return NextResponse.json(
      { error: 'Failed to list documentation files' },
      { status: 500 }
    )
  }
}
