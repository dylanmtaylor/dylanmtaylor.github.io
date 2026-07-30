export type Post = {
    frontMatter: {
        date: string
        title: string
        description: string
    }
    regularPath: string
}

export function useYearSort(posts: readonly Post[]): Post[][] {
    const postsByYear = new Map<string, Post[]>()

    for (const post of posts) {
        const year = post.frontMatter.date.split('-', 1)[0]
        if (!year) continue

        const yearPosts = postsByYear.get(year) ?? []
        yearPosts.push(post)
        postsByYear.set(year, yearPosts)
    }

    return [...postsByYear.values()]
}
