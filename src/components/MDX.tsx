import React from 'react'
import Image, { ImageProps } from 'next/image'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

const MDX: React.FC<{ source: MDXRemoteSerializeResult<Record<string, unknown>> }> = ({
  source,
}) => {
  return (
    <MDXRemote
      {...source}
      components={{
        Steps: ({ children }) => <ul>{children}</ul>,
        Image: (props: ImageProps) => <Image alt={props.alt} {...props} />,
      }}
    />
  )
}

export default MDX
