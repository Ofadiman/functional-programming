import { pipe, both, either, filter } from 'ramda'

type Person = {
  birthCountry: string
  birthDate: Date
  naturalizationDate: Date | null
}

type User = {
  id: string
  age: number
  gender: 'male' | 'female'
  hasAnimals: boolean
}

const users: User[] = []

namespace RefactoringIfStatements {
  namespace Regular {
    const typicalIsEligibleToVote = (person: Person) => {
      if (person.birthCountry === 'poland' || person.naturalizationDate !== null) {
        if (Date.now() - person.birthDate.getTime() > 18 * 365 * 24 * 60 * 60 * 1000) {
          return true
        }
        return false
      }
      return false
    }
  }

  namespace Functional {
    const wasBornInPoland = (person: Person) => person.birthCountry === 'poland'
    const wasNaturalized = (person: Person) => person.naturalizationDate !== null
    const isOver18 = (person: Person) =>
      Date.now() - new Date().getTime() > 18 * 365 * 24 * 60 * 60 * 1000

    const isCitizen = either(wasBornInPoland, wasNaturalized)

    const functionalIsEligibleToVote = (person: Person) => both(isCitizen, isOver18)
  }
}

namespace RefactoringFilters {
  namespace Regular {
    const selectAdultMalesWithAnimals = (users: User[]) => {
      return users.filter((user) => {
        if (user.gender === 'male') {
          if (user.age > 18) {
            if (user.hasAnimals === true) {
              return true
            }
          }
        }
        return false
      })
    }
  }

  namespace Functional {
    const selectMales = filter((user: User) => user.gender === 'male')
    const selectAdults = filter((user: User) => user.age > 18)
    const selectWithAnimals = filter((user: User) => user.hasAnimals === true)
    const selectAdultMalesWithAnimals = pipe(selectMales, selectAdults, selectWithAnimals)

    const adults = selectAdults(users)
    const adultMalesWithAnimals = selectAdultMalesWithAnimals(users)
  }
}
