type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P
}

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
