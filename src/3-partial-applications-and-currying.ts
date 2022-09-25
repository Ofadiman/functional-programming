import { curry, filter, map, pipe } from 'ramda'

type Book = {
  title: string
  year: number
}

namespace Default {
  const publishedInYear = (book: Book, year: number) => book.year === year

  const titlesForYear = (books: Book[], year: number) => {
    const selected = filter((book) => publishedInYear(book, year), books)

    return map((book) => book.title, selected)
  }
}

namespace Functional {
  const publishedInYear = curry((year, book) => book.year === year)

  const titlesForYear = curry((year, books) =>
    pipe(
      filter(publishedInYear(year)),
      map((book) => book.title),
    )(books),
  )
}
