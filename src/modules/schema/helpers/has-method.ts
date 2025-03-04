import { SchemaMethodTypes } from '../../types'

export const hasMethod = (value: any, method: SchemaMethodTypes): boolean => {
  if (!value) return false
  return value.some((rule: any) => rule.method === method)
}
