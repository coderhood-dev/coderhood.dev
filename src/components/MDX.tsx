import React from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

const MDX: React.FC<{ source: MDXRemoteSerializeResult<Record<string, unknown>> }> = ({
  source,
}) => {
  return (
    <MDXRemote
      {...source}
      components={{
        Steps: ({ children }) => <ul>{children}</ul>,
        // Image: ({ alt, ...props }) => <img alt={alt} {...props} />,
      }}
    />
  )
}

export default MDX
