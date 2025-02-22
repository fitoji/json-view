import React, { useEffect } from 'react'
import Test from './quiz/Test'

export default function FileViewer({ content }) {
    
    useEffect(() => { // {{ edit_2 }}
       // console.log(content)
        
      }, [content]); // {{ edit_2 }}
    
    return (
          <Test data={content} />
  )
}