/* eslint-disable */
/**
 * Externs file for google closure compiler
 */
// this makes GCC play with browserify

/* eslint-disable no-unused-vars */

/**
 * @param {*=}o
 * @param {*=}u
 */
window.require = function (o, u) {};

/**
 * @type {Object}
 */
window.module = {
  exports: {}
};

/**
 * @api
 * @static
 * @param  {Array<Array<Array<Number>>>} polygonA
 * @param  {Array<Array<Array<Number>>>} polygonB
 * @return {Array<Array<Array<Number>>>|Null}
 */
window.martinez = function (polygonA, polygonB, operation) {};


/**
 * @enum {Number}
 */
window.martinez.operations = {
  INTERSECTION: 0,
  DIFFERENCE: 1,
  UNION: 2,
  XOR: 3
};

/**
 * @api
 * @static
 * @param  {Array<Array<Array<Number>>>} polygonA
 * @param  {Array<Array<Array<Number>>>} polygonB
 * @return {Array<Array<Array<Number>>>|Null}
 */
window.martinez.intersection = function (polygonA, polygonB) {};

/**
 * @api
 * @static
 * @param  {Array<Array<Array<Number>>>} polygonA
 * @param  {Array<Array<Array<Number>>>} polygonB
 * @return {Array<Array<Array<Number>>>|Null}
 */
window.martinez.diff = function (polygonA, polygonB) {};

/**
 * @api
 * @static
 * @param  {Array<Array<Array<Number>>>} polygonA
 * @param  {Array<Array<Array<Number>>>} polygonB
 * @return {Array<Array<Array<Number>>>|Null}
 */
window.martinez.union = function (polygonA, polygonB) {};

/**
 * @api
 * @static
 * @param  {Array<Array<Array<Number>>>} polygonA
 * @param  {Array<Array<Array<Number>>>} polygonB
 * @return {Array<Array<Array<Number>>>|Null}
 */
window.martinez.intersection = function (polygonA, polygonB) {};

/* eslint-enable */
