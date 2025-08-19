import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const docsDirectory = path.join(process.cwd(), 'docs')

function getAllMarkdownFiles(dir: string = docsDirectory): string[] {
  const files: string[] = []
  
  function walkDir(currentDir: string, relativePath: string = '') {
    try {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true })
      
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name)
        const relativeFilePath = path.join(relativePath, entry.name)
        
        if (entry.isDirectory()) {
          walkDir(fullPath, relativeFilePath)
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          // Remove .md extension and convert to slug format
          const slug = relativeFilePath.replace(/\.md$/, '').replace(/\\/g, '/')
          files.push(slug)
        }
      }
    } catch (error) {
      console.error('Error reading directory:', currentDir, error)
    }
  }
  
  try {
    walkDir(dir)
  } catch (error) {
    console.error('Error reading docs directory:', error)
  }
  
  return files
}

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
