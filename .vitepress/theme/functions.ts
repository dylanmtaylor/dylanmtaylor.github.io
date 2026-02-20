type Post = {
    frontMatter: {
        date: string
        title: string
        description: string
    }
    regularPath: string
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
