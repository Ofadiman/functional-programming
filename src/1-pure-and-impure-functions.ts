import knex from 'knex'
import * as fs from 'fs'

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite',
  },
})

namespace PureFunctions {
  const isEven = (value: number) => value % 2 === 0

  const repeat = (value: string, times: number): string => {
    let final = ''
    for (let i = 0; i++; i < times) {
      final += value
    }

    return final
  }
}

namespace ImpureFunctions {
  let modified = 0
  const modifyVariableOutOfScope = (value: number) => {
    modified += value
  }

  let noScope = 0
  const computeUsingVariableOutOfScope = (value: number) => {
    return noScope + value
  }

  const outputToConsole = (value: string) => {
    console.log(`My value is ${value}`)
  }

  const makeHttpRequest = async () => {
    return await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json()
  }

  const queryDatabase = () => {
    return connection.select('*').from('users')
  }

  const modifyReference = (value: { foo: string }) => {
    value.foo = 'bar'
  }

  const writeToFileSystem = () => {
    fs.writeFileSync('./file', 'content')
  }
}
