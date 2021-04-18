export namespace controlsProps {
    namespace limits {
        const minDistance: number;
        const maxDistance: number;
    }
    const drag: number;
    const EPS: number;
    namespace zoomToFit {
        const auto: boolean;
        const targets: string;
        const tightness: number;
    }
    namespace userControl {
        const zoom: boolean;
        const zoomSpeed: number;
        const rotate: boolean;
        const rotateSpeed: number;
        const pan: boolean;
        const panSpeed: number;
    }
    namespace autoRotate {
        const enabled: boolean;
        const speed: number;
    }
    const autoAdjustPlanes: boolean;
}
export namespace controlsState {
    const thetaDelta: number;
    const phiDelta: number;
    const scale: number;
}
export const defaults: any;
export function update({ controls, camera }: {
    controls: any;
    camera: any;
}, output: any): {
    controls: {
        thetaDelta: number;
        phiDelta: number;
        scale: number;
        changed: boolean;
    };
    camera: {
        position: any;
        view: any;
    };
};
/**
  * compute camera state to rotate the camera
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Float} angle value of the angle to rotate
  * @return {Object} the updated camera data/state
*/
export function rotate({ controls, camera, speed }: any, angle: any): any;
/**
  * compute camera state to zoom the camera
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Float} zoomDelta value of the zoom
  * @return {Object} the updated camera data/state
*/
export function zoom({ controls, camera, speed }: any, zoomDelta?: any): any;
/**
  * compute camera state to pan the camera
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Float} delta value of the raw pan delta
  * @return {Object} the updated camera data/state
*/
export function pan({ controls, camera, speed }: any, delta: any): any;
/**
  * compute camera state to 'fit' an object on screen
  * Note1: this is a non optimal but fast & easy implementation
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Array} entities - an array of entities (see entitiesFromSolids)
  * @return {Object} the updated camera data/state
*/
export function zoomToFit({ controls, camera, entities }: any): any;
/**
  * compute controls state to 'reset it' to the given state
  * Note1: this is a non optimal but fast & easy implementation
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Object} desiredState the state to reset the camera to: defaults to default values
  * @return {Object} the updated camera data/state
*/
export function reset({ controls, camera }: any, desiredState: any): any;
