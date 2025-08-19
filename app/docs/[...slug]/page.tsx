import { notFound } from 'next/navigation'
import { getMarkdownContent, getAllMarkdownFiles } from '@/lib/markdown'
import { DocsHeader } from '@/components/docs-header'
import { DocsSidebar } from '@/components/docs-sidebar'
import { TableOfContents } from '@/components/table-of-contents'

interface DocsPageProps {
  params: {
    slug: string[]
  }
}

// Generate static params for all markdown files
export async function generateStaticParams() {
  const files = getAllMarkdownFiles()
  
  return files.map((file) => ({
    slug: file.split('/'),
  }))
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = params
  const markdownData = await getMarkdownContent(slug)

  if (!markdownData) {
    notFound()
  }

  const { content, data } = markdownData
  const title = data.title || slug.join(' / ')

  return (
    <div className="h-screen bg-background flex flex-col">
      <DocsHeader />
      <div className="flex flex-1 h-0">
        <DocsSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-12">
            <div className="max-w-6xl mx-auto flex gap-12">
              <div className="flex-1 min-w-0">
                <div className="mb-8">
                  <h1 className="text-4xl font-black mb-4 gradient-text">
                    {title}
                  </h1>
                  {data.description && (
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {data.description}
                    </p>
                  )}
                </div>
                
                <div 
                  className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-extrabold prose-h2:text-3xl prose-h2:font-semibold prose-h3:text-2xl prose-h3:font-semibold prose-h4:text-xl prose-h4:font-semibold prose-p:leading-7 prose-a:font-medium prose-a:underline prose-a:underline-offset-4 prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:italic prose-code:relative prose-code:rounded prose-code:bg-muted prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:font-mono prose-code:text-sm prose-pre:overflow-x-auto prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
              
              <div className="w-64 shrink-0 hidden xl:block">
                <div className="sticky top-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  <TableOfContents />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
