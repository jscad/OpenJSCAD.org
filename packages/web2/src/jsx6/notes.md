


mixin example and test
 - instanceof works for base class 
 - instanceof can not be tested for mixin class alone because it is created dynamically
 - super works as expected
 - vscode autocomplete can not be yet made to understand both (may not be needed anyway)


```js
    class Dog{
      getName(){
        return 'Dog'
      }
    }

    const mixinYellow = c=> class Yellow extends c{
      getName(){
        return 'Yellow ' + super.getName()
      }
      getColor(){
        return 'Yellow'
      }
    }

    function applyMixin(mixin, base){
      const out = mixin(base)
      out.mixinOf = base
      return out
    }

    let d1 = new Dog()
    console.log(d1.getName())
    const YellowDog = applyMixin(mixinYellow, Dog)
    /** @type { Dog } */
    let d2 = new YellowDog()
    console.log(d2.getName())
    console.log('mixinOf', YellowDog.mixinOf)
    console.log(d2.getColor(), '.getColor()')
    console.log(d2 instanceof Dog, 'd2 instanceof Dog')
    console.log(d2 instanceof YellowDog, 'd2 instanceof YellowDog')
```