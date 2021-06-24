import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

import { buildLessonStrings, getTitleFromFile } from '@/lib/string'

const root = process.cwd()

export async function getFolderContent(url) {
  return fs.readdirSync(path.join(root, 'public/data', url))
}

export async function getCompleteName(shortName, folder) {
  const content = await getFolderContent(folder)
  return content.find((m) => m.includes(shortName))
}

export async function getModule(moduleName) {
  const url = `academy/${moduleName}/readme.mdx`
  console.log('url', url)
  const mdx = await getMDX(url)

  return { ...mdx }
}

export async function getLesson(lessonURL, moduleURL) {
  const moduleName = await getCompleteName(moduleURL, 'academy')
  const lessonName = await getCompleteName(lessonURL, `academy/${moduleName}`)

  const mdx = await getMDX(`academy/${moduleName}/${lessonName}/readme.mdx`)
  const pdfURL = await getPDF(moduleName, lessonName)

  return { ...mdx, pdfURL }
}

export async function getLessons(moduleURL) {
  const moduleName = await getCompleteName(moduleURL, 'academy')
  const lessonsNames = await getFolderContent(`academy/${moduleName}`)

  const lessons = []
  for (const lesson of lessonsNames) {
    // don't include readme.mdx
    if (lesson.includes('.')) {
      continue
    }

    const lessonPath = `academy/${moduleName}/${lesson}`
    const lessonContent = await getFolderContent(lessonPath)

    if (lessonContent.includes('readme.mdx')) {
      const l = buildLessonStrings(lesson, `/academy/${moduleURL}`)
      lessons.push(l)
    }
  }

  return lessons // [{ url: string, title: string }]
}

export async function getModuleTitle(moduleURL) {
  const moduleName = await getCompleteName(moduleURL, 'academy')

  return {
    text: getTitleFromFile(moduleName),
    url: `/academy/${moduleURL}`,
  }
}

export async function getMDX(url) {
  const source = fs.readFileSync(path.join(root, 'public/data', url), 'utf8')

  const { data, content } = matter(source)
  const mdxSource = await serialize(content)

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      ...data,
    },
  }
}

// Get PDF download link from GitHub repo
export async function getPDF(moduleName, lessonName) {
  if (!process.env.REPO_URL) {
    throw new Error('process.env.REPO_URL not found!')
  }
  const githubURL = `${process.env.REPO_URL}/contents/public/data/academy/${moduleName}/${lessonName}?ref=master`

  const githubLessonFiles = await fetch(githubURL, {
    headers: { Authorization: `token ${process.env.GITHUB_OAUTH_TOKEN}` },
  }).then((r) => r.json())

  console.log(githubLessonFiles, typeof githubLessonFiles)
  // INFO: githubLessonFiles.message is an error message. Ex: 'Not found'
  if (githubLessonFiles && !githubLessonFiles.message) {
    const pdfFile = githubLessonFiles.find(({ name }) => name.includes('.pdf'))

    return pdfFile ? pdfFile.download_url : null
  }

  return null
}
