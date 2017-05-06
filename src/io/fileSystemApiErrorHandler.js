function FileSystemApiErrorHandler (fileError, operation) {
  const errormap = {
    1: 'NOT_FOUND_ERR',
    2: 'SECURITY_ERR',
    3: 'ABORT_ERR',
    4: 'NOT_READABLE_ERR',
    5: 'ENCODING_ERR',
    6: 'NO_MODIFICATION_ALLOWED_ERR',
    7: 'INVALID_STATE_ERR',
    8: 'SYNTAX_ERR',
    9: 'INVALID_MODIFICATION_ERR',
    10: 'QUOTA_EXCEEDED_ERR',
    11: 'TYPE_MISMATCH_ERR',
    12: 'PATH_EXISTS_ERR',
  }
  var errname
  if (fileError.code in errormap) {
    errname = errormap[fileError.code]
  } else {
    errname = 'Error #' + fileError.code
  }
  const errtxt = 'FileSystem API error: ' + operation + ' returned error ' + errname
  throw new Error(errtxt)
}
