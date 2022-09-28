import { __, always, cond, equals, gte, identity, ifElse, inc, lt, T, unless, when } from 'ramda'

namespace Default {
  const forever21 = (age: number) => {
    if (age >= 21) {
      return 21
    }

    return age + 1
  }

  const alwaysDrivingAgeIfElse = (age: number) => {
    if (age < 16) {
      return 16
    }

    return age
  }

  const alwaysDrivingAgeIfElseIdentity = (age: number) => {
    if (age < 16) {
      return 16
    }

    return age
  }

  const alwaysDrivingAgeWhen = (age: number) => {
    if (age < 16) {
      return 16
    }

    return age
  }

  const alwaysDrivingAgeUnless = (age: number) => {
    if (age < 16) {
      return 16
    }

    return age
  }

  const water = (temperature: number) => {
    switch (temperature) {
      case 0: {
        return 'water freezes at 0°C'
      }
      case 100: {
        return 'water boils at 100°C'
      }
      default: {
        return `nothing special happens at ${temperature}°C`
      }
    }
  }
}

namespace Functional {
  const forever21 = (age: number) => ifElse(gte(__, 21), () => 21, inc)(age)

  const alwaysDrivingAgeIfElse = (age: number) => ifElse(lt(__, 16), always(16), (a) => a)(age)

  const alwaysDrivingAgeIfElseIdentity = (age: number) =>
    ifElse(lt(__, 16), always(16), identity)(age)

  const alwaysDrivingAgeWhen = (age: number) => when(lt(__, 16), always(16))(age)

  const alwaysDrivingAgeUnless = (age: number) => unless(gte(__, 16), always(16))(age)

  const water = (temperature: number) =>
    cond([
      [equals(0), always('water freezes at 0°C')],
      [equals(100), always('water boils at 100°C')],
      [T, (temp) => `nothing special happens at ${temp}°C`],
    ])(temperature)
}
