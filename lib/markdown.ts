import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

const docsDirectory = path.join(process.cwd(), 'docs')

export interface MarkdownData {
  content: string
  data: {
    title?: string
    description?: string
    [key: string]: any
  }
}

export async function getMarkdownContent(slug: string[]): Promise<MarkdownData | null> {
  try {
    // Construct the file path
    const filePath = path.join(docsDirectory, ...slug) + '.md'
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return null
    }

    // Read the markdown file
    const fileContents = fs.readFileSync(filePath, 'utf8')
    
    // Parse the markdown with gray-matter
    const { data, content } = matter(fileContents)
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .process(content)
    
    const contentHtml = processedContent.toString()

    return {
      content: contentHtml,
      data
    }
  } catch (error) {
    console.error('Error processing markdown:', error)
    return null
  }
}

export function getAllMarkdownFiles(dir: string = docsDirectory): string[] {
  const files: string[] = []
  
  function walkDir(currentDir: string, relativePath: string = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      const relativeFilePath = path.join(relativePath, entry.name)
      
      if (entry.isDirectory()) {
        walkDir(fullPath, relativeFilePath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Remove .md extension and convert to slug format
        const slug = relativeFilePath.replace(/\.md$/, '')
        files.push(slug)
      }
    }
  }
  
  try {
    walkDir(dir)
  } catch (error) {
    console.error('Error reading docs directory:', error)
  }
  
  return files
}
