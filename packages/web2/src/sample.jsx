export default function (h, state, $) {
  state.counter = 10
  return <button onclick={() => state.counter++}>Sample {() => state.counter}</button>
}
