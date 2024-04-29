import { httpStatus } from '../http-status-handlers'

describe('HTTP status handlers', () => {
  it('Should return status code and injected body', async () => {
    expect(httpStatus.continue('CONTINUE')).toEqual({ statusCode: 100, body: 'CONTINUE' })
    expect(httpStatus.switchingProtocols('SWITCHING_PROTOCOLS')).toEqual({ statusCode: 101, body: 'SWITCHING_PROTOCOLS' })
    expect(httpStatus.ok('OK')).toEqual({ statusCode: 200, body: 'OK' })
    expect(httpStatus.created('CREATED')).toEqual({ statusCode: 201, body: 'CREATED' })
    expect(httpStatus.accepted('ACCEPTED')).toEqual({ statusCode: 202, body: 'ACCEPTED' })
    expect(httpStatus.nonAuthoritativeInformation('NON_AUTHORITATIVE_INFORMATION')).toEqual({ statusCode: 203, body: 'NON_AUTHORITATIVE_INFORMATION' })
    expect(httpStatus.noContent('NO_CONTENT')).toEqual({ statusCode: 204, body: 'NO_CONTENT' })
    expect(httpStatus.resetContent('RESET_CONTENT')).toEqual({ statusCode: 205, body: 'RESET_CONTENT' })
    expect(httpStatus.partialContent('PARTIAL_CONTENT')).toEqual({ statusCode: 206, body: 'PARTIAL_CONTENT' })
    expect(httpStatus.multipleChoices('MULTIPLE_CHOICES')).toEqual({ statusCode: 300, body: 'MULTIPLE_CHOICES' })
    expect(httpStatus.movedPermanently('MOVED_PERMANENTLY')).toEqual({ statusCode: 301, body: 'MOVED_PERMANENTLY' })
    expect(httpStatus.movedTemporarily('MOVED_TEMPORARILY')).toEqual({ statusCode: 302, body: 'MOVED_TEMPORARILY' })
    expect(httpStatus.seeOther('SEE_OTHER')).toEqual({ statusCode: 303, body: 'SEE_OTHER' })
    expect(httpStatus.notModified('NOT_MODIFIED')).toEqual({ statusCode: 304, body: 'NOT_MODIFIED' })
    expect(httpStatus.useProxy('USE_PROXY')).toEqual({ statusCode: 305, body: 'USE_PROXY' })
    expect(httpStatus.temporaryRedirect('TEMPORARY_REDIRECT')).toEqual({ statusCode: 307, body: 'TEMPORARY_REDIRECT' })
    expect(httpStatus.permanentRedirect('PERMANENT_REDIRECT')).toEqual({ statusCode: 308, body: 'PERMANENT_REDIRECT' })
    expect(httpStatus.badRequest('BAD_REQUEST')).toEqual({ statusCode: 400, body: 'BAD_REQUEST' })
    expect(httpStatus.unauthorized('UNAUTHORIZED')).toEqual({ statusCode: 401, body: 'UNAUTHORIZED' })
    expect(httpStatus.paymentRequired('PAYMENT_REQUIRED')).toEqual({ statusCode: 402, body: 'PAYMENT_REQUIRED' })
    expect(httpStatus.forbidden('FORBIDDEN')).toEqual({ statusCode: 403, body: 'FORBIDDEN' })
    expect(httpStatus.notFound('NOT_FOUND')).toEqual({ statusCode: 404, body: 'NOT_FOUND' })
    expect(httpStatus.methodNotAllowed('METHOD_NOT_ALLOWED')).toEqual({ statusCode: 405, body: 'METHOD_NOT_ALLOWED' })
    expect(httpStatus.notAcceptable('NOT_ACCEPTABLE')).toEqual({ statusCode: 406, body: 'NOT_ACCEPTABLE' })
    expect(httpStatus.proxyAuthenticationRequired('PROXY_AUTHENTICATION_REQUIRED')).toEqual({ statusCode: 407, body: 'PROXY_AUTHENTICATION_REQUIRED' })
    expect(httpStatus.requestTimeout('REQUEST_TIMEOUT')).toEqual({ statusCode: 408, body: 'REQUEST_TIMEOUT' })
    expect(httpStatus.conflict('CONFLICT')).toEqual({ statusCode: 409, body: 'CONFLICT' })
    expect(httpStatus.gone('GONE')).toEqual({ statusCode: 410, body: 'GONE' })
    expect(httpStatus.lengthRequired('LENGTH_REQUIRED')).toEqual({ statusCode: 411, body: 'LENGTH_REQUIRED' })
    expect(httpStatus.preconditionFailed('PRECONDITION_FAILED')).toEqual({ statusCode: 412, body: 'PRECONDITION_FAILED' })
    expect(httpStatus.requestTooLong('REQUEST_TOO_LONG')).toEqual({ statusCode: 413, body: 'REQUEST_TOO_LONG' })
    expect(httpStatus.requestURITooLong('REQUEST_URI_TOO_LONG')).toEqual({ statusCode: 414, body: 'REQUEST_URI_TOO_LONG' })
    expect(httpStatus.unsupportedMediaType('UNSUPPORTED_MEDIA_TYPE')).toEqual({ statusCode: 415, body: 'UNSUPPORTED_MEDIA_TYPE' })
    expect(httpStatus.requestedRangeNotSatisfiable('REQUESTED_RANGE_NOT_SATISFIABLE')).toEqual({ statusCode: 416, body: 'REQUESTED_RANGE_NOT_SATISFIABLE' })
    expect(httpStatus.expectationFailed('EXPECTATION_FAILED')).toEqual({ statusCode: 417, body: 'EXPECTATION_FAILED' })
    expect(httpStatus.imATeapot('IM_A_TEAPOT')).toEqual({ statusCode: 418, body: 'IM_A_TEAPOT' })
    expect(httpStatus.insufficientSpaceOnResource('INSUFFICIENT_SPACE_ON_RESOURCE')).toEqual({ statusCode: 419, body: 'INSUFFICIENT_SPACE_ON_RESOURCE' })
    expect(httpStatus.methodFailure('METHOD_FAILURE')).toEqual({ statusCode: 420, body: 'METHOD_FAILURE' })
    expect(httpStatus.misdirectedRequest('MISDIRECTED_REQUEST')).toEqual({ statusCode: 421, body: 'MISDIRECTED_REQUEST' })
    expect(httpStatus.unprocessableEntity('UNPROCESSABLE_ENTITY')).toEqual({ statusCode: 422, body: 'UNPROCESSABLE_ENTITY' })
    expect(httpStatus.locked('LOCKED')).toEqual({ statusCode: 423, body: 'LOCKED' })
    expect(httpStatus.failedDependency('FAILED_DEPENDENCY')).toEqual({ statusCode: 424, body: 'FAILED_DEPENDENCY' })
    expect(httpStatus.upgradeRequired('UPGRADE_REQUIRED')).toEqual({ statusCode: 426, body: 'UPGRADE_REQUIRED' })
    expect(httpStatus.preconditionRequired('PRECONDITION_REQUIRED')).toEqual({ statusCode: 428, body: 'PRECONDITION_REQUIRED' })
    expect(httpStatus.tooManyRequests('TOO_MANY_REQUESTS')).toEqual({ statusCode: 429, body: 'TOO_MANY_REQUESTS' })
    expect(httpStatus.requestHeaderFieldsTooLarge('REQUEST_HEADER_FIELDS_TOO_LARGE')).toEqual({ statusCode: 431, body: 'REQUEST_HEADER_FIELDS_TOO_LARGE' })
    expect(httpStatus.unavailableForLegalReasons('UNAVAILABLE_FOR_LEGAL_REASONS')).toEqual({ statusCode: 451, body: 'UNAVAILABLE_FOR_LEGAL_REASONS' })
    expect(httpStatus.internalServerError('INTERNAL_SERVER_ERROR')).toEqual({ statusCode: 500, body: 'INTERNAL_SERVER_ERROR' })
    expect(httpStatus.notImplemented('NOT_IMPLEMENTED')).toEqual({ statusCode: 501, body: 'NOT_IMPLEMENTED' })
    expect(httpStatus.badGateway('BAD_GATEWAY')).toEqual({ statusCode: 502, body: 'BAD_GATEWAY' })
    expect(httpStatus.serviceUnavailable('SERVICE_UNAVAILABLE')).toEqual({ statusCode: 503, body: 'SERVICE_UNAVAILABLE' })
    expect(httpStatus.gatewayTimeout('GATEWAY_TIMEOUT')).toEqual({ statusCode: 504, body: 'GATEWAY_TIMEOUT' })
    expect(httpStatus.httpVersionNotSupported('HTTP_VERSION_NOT_SUPPORTED')).toEqual({ statusCode: 505, body: 'HTTP_VERSION_NOT_SUPPORTED' })
    expect(httpStatus.insufficientStorage('INSUFFICIENT_STORAGE')).toEqual({ statusCode: 507, body: 'INSUFFICIENT_STORAGE' })
    expect(httpStatus.networkAuthenticationRequired('NETWORK_AUTHENTICATION_REQUIRED')).toEqual({ statusCode: 511, body: 'NETWORK_AUTHENTICATION_REQUIRED' })
  })
})
