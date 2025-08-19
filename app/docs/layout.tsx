import { DocsHeader } from "@/components/docs-header"
import { DocsSidebar } from "@/components/docs-sidebar"
import { TableOfContents } from "@/components/table-of-contents"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen bg-background flex flex-col">
      <DocsHeader />
      <div className="flex flex-1 h-0">
        <DocsSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-12">
            <div className="max-w-6xl mx-auto flex gap-12">
              <div className="flex-1 min-w-0">
                {children}
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
