type Post = {
    frontMatter: {
        date: string
        title: string
        category: string
        tags: string[]
        description: string
    }
    regularPath: string
}

export function initTags(post: Post[]): Record<string, Post[]> {
    const data: Record<string, Post[]> = {}
    for (const element of post) {
        const tags = element.frontMatter.tags
        if (tags) {
            tags.forEach((item) => {
                if (!data[item]) data[item] = []
                data[item].push(element)
            })
        }
    }
    return data
}

export function initCategory(post: Post[]): Record<string, Post[]> {
    const data: Record<string, Post[]> = {}
    for (const element of post) {
        const category = element.frontMatter.category
        if (category) {
            if (!data[category]) data[category] = []
            data[category].push(element)
        }
    }
    return data
}

export function useYearSort(post: Post[]) {
    const data: Post[][] = []
    let year = '0'
    let num = -1
    for (const element of post) {
        if (element.frontMatter.date) {
            const y = element.frontMatter.date.split('-')[0]
            if (y === year) {
                data[num].push(element)
            } else {
                num++
                data[num] = [element]
                year = y
            }
        }
    }
    return data
}
