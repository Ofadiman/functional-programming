import { List, Map } from 'immutable'

namespace Functional {
  const list1 = List([{ name: 'john', age: 20 }]) // [{name:'john',age:20 }]
  const list2 = list1.push({ name: 'jacob', age: 55 }) // [{name:'john',age:20},{name:'jacob',age:55}]
  const list3 = list2.remove(1) // [{name:'jacob',age:55}]

  const map1 = Map({ foo: 'foo' }) // {foo:'foo'}
  const map2 = map1.set('bar', 'bar') // {foo:'foo',bar:'bar'}
  const map3 = map2.delete('foo') // {bar:'bar'}
}
