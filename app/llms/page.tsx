import fs from 'fs'
import path from 'path'

export default async function LlmsPage() {
  let content = ''
  
  try {
    const filePath = path.join(process.cwd(), 'public', 'llms.txt')
    content = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    content = 'Error loading llms.txt file'
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-4 gradient-text">
              OACP Documentation Index
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive index for AI models and crawlers
            </p>
          </div>
          
          <div className="bg-card rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">llms.txt</h2>
              <a 
                href="/llms.txt" 
                className="text-sm text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Raw File
              </a>
            </div>
            
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap overflow-x-auto">
              {content}
            </pre>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              This file is designed to be machine-readable for AI models and crawlers.{' '}
              <a href="/llms.txt" className="text-primary hover:underline">
                Access the raw file directly
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
