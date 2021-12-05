export default function (h, state, $) {
  $.counter = 11
  return <button onclick={() => state.counter++}>Sample {() => state.counter}</button>
}
