import { Jsx6, T } from './jsx6'

class CustomInput extends Jsx6 {

}

export class SampleForm extends Jsx6 {
  tpl (h, state, $) {
    const F = this.formBinding
    return (
      <>
        <div class='frl'>
          <label>{T`name`}</label>
          <input type='text' value={F.name} />
        </div>
        <div class='frl'>
          <label>{T`city`}</label>
          <CustomInput value={F.city} />
        </div>
      </>
    )
  }
}
