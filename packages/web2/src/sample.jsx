export default function (h, state, $) {
  state.counter = 10
  return <b onclick={() => state.counter++}>Sample {() => state.counter}</b>
}
