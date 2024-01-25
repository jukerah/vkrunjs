import {
  validateBoolean,
  validateDate,
  validateEmail,
  validateFloat,
  validateInteger,
  validateMaxLength,
  validateMinLength,
  validateMinWord,
  validateNumber,
  validateRequired,
  validateString,
  validateUuid,
  validateDateGreaterThan,
  validateDateLessThan,
  validateTime,
  validateNotRequired,
  validateArray,
  validateEqual
} from './helpers/validate'
import {
  DateGreaterThanMethod,
  DateLessThanMethod,
  DateMethod,
  DateTypes,
  DefaultReturn,
  EmailMethod,
  ErrorTest,
  ErrorTypes,
  IValidator,
  MaxLengthMethod,
  Method,
  Methods,
  MinLengthMethod,
  MinWordMethod,
  NotRequiredMethod,
  NumberMethod,
  ObjectConfig,
  ObjectType,
  StringMethod,
  SuccessTest,
  Tests,
  TimeTypes,
  UUIDMethod
} from '../types'
import { hasMethod } from '../utils'
import { CreateSchema } from '../schema'

export class Validator implements IValidator {
  private value: any
  private valueName: any
  private readonly methods: Methods
  private uninitializedValidation: boolean
  private tests: Tests

  constructor () {
    this.valueName = undefined
    this.methods = []
    this.uninitializedValidation = true
    this.tests = {
      passedAll: false,
      passed: 0,
      failed: 0,
      totalTests: 0,
      successes: [],
      errors: [],
      time: ''
    }
  }

  string (): StringMethod {
    this.methodBuild({ method: 'string' })

    const email = (): EmailMethod => {
      this.methodBuild({ method: 'email' })
      return this.defaultReturnMethods()
    }

    const UUID = (): UUIDMethod => {
      this.methodBuild({ method: 'UUID' })
      return this.defaultReturnMethods()
    }

    const minLength = (minLength: number): MinLengthMethod => {
      if (hasMethod(this.methods, 'minLength')) {
        console.error('vkrun: minLength method has already been called!')
        throw Error('minLength method has already been called!')
      }

      this.methodBuild({ method: 'minLength', minLength })
      return { maxLength, minWord, ...this.defaultReturnMethods() }
    }

    const maxLength = (maxLength: number): MaxLengthMethod => {
      if (hasMethod(this.methods, 'maxLength')) {
        console.error('vkrun: maxLength method has already been called!')
        throw Error('maxLength method has already been called!')
      }

      this.methodBuild({ method: 'maxLength', maxLength })
      return { minLength, minWord, ...this.defaultReturnMethods() }
    }

    const minWord = (minWord: number): MinWordMethod => {
      if (hasMethod(this.methods, 'minWord')) {
        console.error('vkrun: minWord method has already been called!')
        throw Error('minWord method has already been called!')
      }

      this.methodBuild({ method: 'minWord', minWord })
      return { minLength, maxLength, ...this.defaultReturnMethods() }
    }

    return {
      minLength,
      maxLength,
      minWord,
      email,
      UUID,
      ...this.defaultReturnMethods()
    }
  }

  number (): NumberMethod {
    this.methodBuild({ method: 'number' })

    const float = (): DefaultReturn => {
      this.methodBuild({ method: 'float' })
      return this.defaultReturnMethods()
    }

    const integer = (): DefaultReturn => {
      this.methodBuild({ method: 'integer' })
      return this.defaultReturnMethods()
    }

    return { float, integer, ...this.defaultReturnMethods() }
  }

  boolean (): DefaultReturn {
    this.methodBuild({ method: 'boolean' })
    return this.defaultReturnMethods()
  }

  notRequired (): NotRequiredMethod {
    this.methodBuild({ method: 'notRequired' })
    return {
      throw: (value: any, valueName: string, ClassError?: ErrorTypes) => this.throw(value, valueName, ClassError),
      throwAsync: async (value: any, valueName: string, ClassError?: ErrorTypes) => await this.throwAsync(value, valueName, ClassError),
      validate: (value: any) => this.validate(value),
      validateAsync: async (value: any) => await this.validateAsync(value),
      test: (value: any, valueName: string) => this.test(value, valueName),
      testAsync: async (value: any, valueName: string) => await this.testAsync(value, valueName)
    }
  }

  date (type?: DateTypes): DateMethod {
    this.methodBuild({ method: 'date', dateType: type })

    const dateGreaterThan = (dateToCompare: Date): DateGreaterThanMethod => {
      if (hasMethod(this.methods, 'dateGreaterThan')) {
        console.error('vkrun: dateGreaterThan method has already been called!')
        throw Error('minWord dateGreaterThan has already been called!')
      }

      this.methodBuild({ method: 'dateGreaterThan', dateToCompare })
      return { dateLessThan, ...this.defaultReturnMethods() }
    }

    const dateLessThan = (dateToCompare: Date): DateLessThanMethod => {
      if (hasMethod(this.methods, 'dateLessThan')) {
        console.error('vkrun: dateLessThan method has already been called!')
        throw Error('minWord dateLessThan has already been called!')
      }

      this.methodBuild({ method: 'dateLessThan', dateToCompare })
      return { dateGreaterThan, ...this.defaultReturnMethods() }
    }

    return { dateGreaterThan, dateLessThan, ...this.defaultReturnMethods() }
  }

  time (type: TimeTypes): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'time', timeType: type })
    } else {
      validateTime({
        value: this.value,
        valueName: this.valueName,
        type,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  alias (valueName: string): this {
    this.valueName = valueName
    return this
  }

  array (): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'array' })
    } else {
      validateArray({
        value: this.value,
        valueName: this.valueName,
        methods: this.methods,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  equal (valueToCompare: any): this {
    if (this.uninitializedValidation) {
      this.methodBuild({ method: 'equal', valueToCompare })
    } else {
      validateEqual({
        value: this.value,
        valueToCompare,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }
    return this
  }

  schema (schema: ObjectType, config?: ObjectConfig): CreateSchema {
    return new CreateSchema(schema, config)
  }

  private methodBuild (build: Method): void {
    this.methods.push(build)
  }

  private passedAll (): void {
    this.tests.passedAll = this.tests.passed === this.tests.totalTests
  }

  private addPassed (success: SuccessTest): void {
    ++this.tests.passed
    ++this.tests.totalTests
    this.tests.successes.push(success)
    this.passedAll()
  }

  private addFailed (error: ErrorTest): void {
    ++this.tests.failed
    ++this.tests.totalTests
    this.tests.errors.push(error)
    this.passedAll()
  }

  private validateMethods (): void {
    this.resetTests()

    this.uninitializedValidation = false
    const executeMethod = (rule: any): void => {
      if (rule.method === 'string') {
        validateString({
          value: this.value,
          valueName: this.valueName,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'minWord') {
        validateMinWord({
          value: this.value,
          valueName: this.valueName,
          minWord: rule.minWord,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'email') {
        validateEmail({
          value: this.value,
          valueName: this.valueName,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'UUID') {
        validateUuid({
          value: this.value,
          valueName: this.valueName,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'maxLength') {
        validateMaxLength({
          value: this.value,
          valueName: this.valueName,
          maxLength: rule.maxLength,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'minLength') {
        validateMinLength({
          value: this.value,
          valueName: this.valueName,
          minLength: rule.minLength,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'number') {
        validateNumber({
          value: this.value,
          valueName: this.valueName,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'float') {
        validateFloat({
          value: this.value,
          valueName: this.valueName,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'integer') {
        validateInteger({
          value: this.value,
          valueName: this.valueName,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'boolean') {
        validateBoolean({
          value: this.value,
          valueName: this.valueName,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'date') {
        validateDate({
          value: this.value,
          valueName: this.valueName,
          type: rule.dateType,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'dateGreaterThan') {
        validateDateGreaterThan({
          value: this.value,
          valueName: this.valueName,
          dateToCompare: rule.dateToCompare,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'dateLessThan') {
        validateDateLessThan({
          value: this.value,
          valueName: this.valueName,
          dateToCompare: rule.dateToCompare,
          callbackAddPassed: success => this.addPassed(success),
          callbackAddFailed: error => this.addFailed(error)
        })
      } else if (rule.method === 'time') {
        this.time(rule?.timeType)
      } else if (rule.method === 'equal') {
        this.equal(rule?.valueToCompare)
      }
    }

    if (hasMethod(this.methods, 'notRequired')) {
      validateNotRequired({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success)
      })
      if (this.value === undefined) return
    } else {
      validateRequired({
        value: this.value,
        valueName: this.valueName,
        callbackAddPassed: success => this.addPassed(success),
        callbackAddFailed: error => this.addFailed(error)
      })
    }

    if (hasMethod(this.methods, 'array')) {
      this.array()
    } else {
      this.methods.forEach(rule => executeMethod(rule))
    }
  }

  private resetTests (): void {
    this.tests = {
      passedAll: false,
      passed: 0,
      failed: 0,
      totalTests: 0,
      successes: [],
      errors: [],
      time: ''
    }
  }

  private defaultReturnMethods (): DefaultReturn {
    return {
      notRequired: () => this.notRequired(),
      throw: (value: any, valueName: string, ClassError?: ErrorTypes) => this.throw(value, valueName, ClassError),
      throwAsync: async (value: any, valueName: string, ClassError?: ErrorTypes) => await this.throwAsync(value, valueName, ClassError),
      validate: (value: any) => this.validate(value),
      validateAsync: async (value: any) => await this.validateAsync(value),
      test: (value: any, valueName: string) => this.test(value, valueName),
      testAsync: async (value: any, valueName: string) => await this.testAsync(value, valueName)
    }
  }

  throw (value: any, valueName: string, ClassError?: ErrorTypes): void {
    this.value = value
    this.valueName = valueName
    this.validateMethods()

    if (this.tests.errors.length > 0) {
      if (ClassError) {
        const TestClassError = new ClassError('')
        const extendsError = TestClassError instanceof Error
        if (extendsError) {
          throw new ClassError(this.tests.errors[0].message)
        } else {
          throw new Error('invalid param: class error provided is not valid!')
        }
      } else {
        throw new Error(this.tests.errors[0].message)
      }
    }
  }

  async throwAsync (value: any, valueName: string, ClassError?: ErrorTypes): Promise<void> {
    this.value = await value
    this.valueName = valueName
    this.validateMethods()

    if (this.tests.errors.length > 0) {
      if (ClassError) {
        const TestClassError = new ClassError('')
        const extendsError = TestClassError instanceof Error
        if (extendsError) {
          throw new ClassError(this.tests.errors[0].message)
        } else {
          throw new Error('invalid param: class error provided is not valid!')
        }
      } else {
        throw new Error(this.tests.errors[0].message)
      }
    }
  }

  test (value: any, valueName: string): Tests {
    const startDate = new Date()
    this.value = value
    this.valueName = valueName
    this.validateMethods()
    const endTime = new Date()
    const elapsedTime = endTime.getTime() - startDate.getTime()
    const seconds = Math.floor(elapsedTime / 1000)
    const ms = elapsedTime % 1000 || 1
    this.tests.time = `${seconds}s ${ms}ms`
    return this.tests
  }

  async testAsync (value: any, valueName: string): Promise<Tests> {
    const startDate = new Date()
    this.value = await value
    this.valueName = valueName
    this.validateMethods()
    const endTime = new Date()
    const elapsedTime = endTime.getTime() - startDate.getTime()
    const seconds = Math.floor(elapsedTime / 1000)
    const ms = elapsedTime % 1000 || 1
    this.tests.time = `${seconds}s ${ms}ms`
    return this.tests
  }

  validate (value: any): boolean {
    this.value = value
    this.validateMethods()
    return this.tests.passedAll
  }

  async validateAsync (value: any): Promise<boolean> {
    this.value = await value
    this.validateMethods()
    return this.tests.passedAll
  }
}

export const validator = (): Validator => {
  return new Validator()
}
