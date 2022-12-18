export const epsilon = 1.1102230246251565e-16
export const splitter = 134217729
export const resulterrbound = (3 + 8 * epsilon) * epsilon

// fast_expansion_sum_zeroelim routine from oritinal code
export const sum = (elen, e, flen, f, h) => {
  let Q, Qnew, hh, bvirt
  let enow = e[0]
  let fnow = f[0]
  let eindex = 0
  let findex = 0
  if ((fnow > enow) === (fnow > -enow)) {
    Q = enow
    enow = e[++eindex]
  } else {
    Q = fnow
    fnow = f[++findex]
  }
  let hindex = 0
  if (eindex < elen && findex < flen) {
    if ((fnow > enow) === (fnow > -enow)) {
      $Fast_Two_Sum(enow, Q, Qnew, hh)
      enow = e[++eindex]
    } else {
      $Fast_Two_Sum(fnow, Q, Qnew, hh)
      fnow = f[++findex]
    }
    Q = Qnew
    if (hh !== 0) {
      h[hindex++] = hh
    }
    while (eindex < elen && findex < flen) {
      if ((fnow > enow) === (fnow > -enow)) {
        $Two_Sum(Q, enow, Qnew, hh)
        enow = e[++eindex]
      } else {
        $Two_Sum(Q, fnow, Qnew, hh)
        fnow = f[++findex]
      }
      Q = Qnew
      if (hh !== 0) {
        h[hindex++] = hh
      }
    }
  }
  while (eindex < elen) {
    $Two_Sum(Q, enow, Qnew, hh)
    enow = e[++eindex]
    Q = Qnew
    if (hh !== 0) {
      h[hindex++] = hh
    }
  }
  while (findex < flen) {
    $Two_Sum(Q, fnow, Qnew, hh)
    fnow = f[++findex]
    Q = Qnew
    if (hh !== 0) {
      h[hindex++] = hh
    }
  }
  if (Q !== 0 || hindex === 0) {
    h[hindex++] = Q
  }
  return hindex
}

const sum_three = (alen, a, blen, b, clen, c, tmp, out) => sum(sum(alen, a, blen, b, tmp), tmp, clen, c, out)

// scale_expansion_zeroelim routine from oritinal code
const scale = (elen, e, b, h) => {
  let Q, sum, hh, product1, product0
  let bvirt, c, ahi, alo, bhi, blo

  $Split(b, bhi, blo)
  let enow = e[0]
  $Two_Product_Presplit(enow, b, bhi, blo, Q, hh)
  let hindex = 0
  if (hh !== 0) {
    h[hindex++] = hh
  }
  for (let i = 1; i < elen; i++) {
    enow = e[i]
    $Two_Product_Presplit(enow, b, bhi, blo, product1, product0)
    $Two_Sum(Q, product0, sum, hh)
    if (hh !== 0) {
      h[hindex++] = hh
    }
    $Fast_Two_Sum(product1, sum, Q, hh)
    if (hh !== 0) {
      h[hindex++] = hh
    }
  }
  if (Q !== 0 || hindex === 0) {
    h[hindex++] = Q
  }
  return hindex
}

const negate = (elen, e) => {
  for (let i = 0; i < elen; i++) e[i] = -e[i]
  return elen
}

export const estimate = (elen, e) => {
  let Q = e[0]
  for (let i = 1; i < elen; i++) Q += e[i]
  return Q
}

export const vec = (n) => new Float64Array(n)
