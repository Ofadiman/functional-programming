import {
  __,
  always,
  cond,
  curry,
  equals,
  filter,
  gte,
  ifElse,
  inc,
  lt,
  map,
  pipe,
  T,
  when,
} from 'ramda'

type Book = {
  title: string
  year: number
}

namespace Functional {
  const forever21 = ifElse(gte(__, 21), always(21), inc)

  const alwaysDrivingAgeWhen = when(lt(__, 16), always(16))

  const water = cond([
    [equals(0), always('water freezes at 0°C')],
    [equals(100), always('water boils at 100°C')],
    [T, (temp) => `nothing special happens at ${temp}°C`],
  ])

  // This is bad because it's not type-safe.
  const publishedInYear = curry((year, book: Book) => book.year === year)
  export const titlesForYear = (year: number) =>
    pipe(
      filter(publishedInYear(year)),
      map((book: Book) => book.title),
    )
  titlesForYear(2000)(['foo', null, 1])
}
