/** kinda, sorta like a nested object.assign, so that nested object values
 * do not get lost
 * note : this is NOT actually making anything immutable !
 * @param  {} output={}
 * @param  {} currentState
 * @param  {} options
 */
export function merge(output: any, currentState: any, options: any): any;
