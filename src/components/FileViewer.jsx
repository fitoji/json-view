import React, { Suspense } from 'react'

const Test = React.lazy(() => import('./quiz/Test'))

export default function FileViewer({ content, questionnaireIdentity, initialMode }) {

    return (
    <Suspense fallback={<div className="flex items-center justify-center p-8 text-muted-foreground">Cargando cuestionario…</div>}>
      <Test
        data={content}
        questionnaireIdentity={questionnaireIdentity}
        initialMode={initialMode}
      />
    </Suspense>
  )
}
