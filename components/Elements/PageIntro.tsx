import Title from '@/components/Elements/Title'
import Markdown from '@/components/Elements/Markdown'
import Container from '@/components/Layout/Container'

export default function PageIntro({
  headline,
  content,
  container,
}: {
  headline?: string | null
  content?: string | null
  slug?: string
  container?: boolean
}) {
  if (!headline && !content) {
    return <></>
  }

  const ContentNode = (
    <>
      <div className="my-4">
        {headline && (
          <Title as="h2" className="mb-8" variant="primary">
            {headline}
          </Title>
        )}

        {content && (
          <div className="gap-16 lg:columns-2">
            <Markdown content={content} />
          </div>
        )}
      </div>
    </>
  )

  return container ? <Container>{ContentNode}</Container> : ContentNode
}
