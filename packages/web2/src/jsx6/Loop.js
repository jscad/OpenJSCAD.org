import { Jsx6 } from './Jsx6'
import { setVisible } from './setVisible'

export class Loop extends Jsx6 {
  items = []
  allItems = []
  count = 0

  constructor (attr, children, parent) {
    let itemAttr = attr
    attr = {tagName: attr.loopTag || '', p:attr.p }
    delete itemAttr.p
    delete itemAttr.loopTag

    super(attr, children, parent)

    this.itemAttr = itemAttr

    if(itemAttr.item){
      this.item = itemAttr.item
      delete itemAttr.item
    } else if(itemAttr.tpl){
      this.tplFunc = itemAttr.tpl
      delete itemAttr.tpl
    }
  }

  setValue (v) {
    v = v || []

    v.forEach((d,i) => this.setItem(d,i))
    this.count = v.length
    this._fixItemList(true)
  }

	setItem (newData, i){
		var item = this.allItems[i];

		if(!item) 
      item = this.allItems[i] = this.makeItem(newData, i);
    else
      item.setValue(newData)

		item.el.loopIndex = i;
		if(newData !== undefined){
			setVisible(item,true)
		}
	}

  makeItem (newData,i){
    let comp
  
    if (this.tplFunc) {
      comp = new Jsx6({ tagName: '' }, [], this.parent)
      comp.tpl = this.tplFunc
      comp.createEl()
      const elements = comp.initTemplate()
      comp.init(comp.state)
      comp.__initialized = true
      if (elements instanceof Array) {
        this.items.push(comp)
        comp.el.push(...elements)
        comp.hasAttribute = function(attr){ return this.el[1].hasAttribute(attr)}
        comp.setAttribute = function(attr, value){ this.el.forEach(el=>{ if(el.setAttribute) el.setAttribute(attr, value)}) }
        elements.forEach(e => this.insertBefore(e))
      } else {
        comp.el = elements
        this.insertBefore(comp)
      }
    }else if(this.item){
      comp = new this.item({...this.itemAttr},[],this.parent)
      this.insertBefore(comp)
    }

    comp.setValue(newData)
    return comp
  }

  _fixItemList (reindex){
    this.items = this.allItems.slice(0,this.count);
		if(reindex){
	    	var it = this.allItems;
	    	for(var i=0; i<it.length; i++){
	    		it[i].el.loopIndex = i;
	    		setVisible(it[i], i<this.count);
	    	}    	
		}		
	}
  
	/** returns only active items (do not access .times property directly as it contains also disabled ones) */
	getItems (){
		return this.items
	};

	getItem (index){
		return this.items[index]
	}

	getItemIndex (item){
		if(!item) return -1
		if(item instanceof Jsx6) item = item.el
		return item.loopIndex
	};

	push (data){
		var index = this.count
		this.setItem(data,index)
		this.count++
		this._fixItemList()
		return this.getItem(index)
	}

	pop (data){
		if(this.count == 0) return;
		this.count--
		var item = this.items.pop()
		item.setVisible(false)

		this._fixItemList()

		this.fireEvent({name:'afterPop', item:item})
		return item
	}

	moveItem (fromIndex, insertBefore){
    	var item = this.allItems.splice(fromIndex,1)[0]
    	if(fromIndex < insertBefore) insertBefore--
    	var elBefore = insertBefore < 0 ? null : elBefore = this.allItems[insertBefore].el
    	if(insertBefore < 0){
    		this.allItems.push(item)
    	}else{
    		this.allItems.splice(insertBefore,0,item)
    	}
    	this.insertBefore(item.el, elBefore)
    	this._fixItemList(true)
	}

	removeItem (item){
		var index = this.getItemIndex(item)
		this.splice(index,1)
	}

	size (){
		return this.count
	}

	splice (index, deleteCount){
		var toAdd = Array.prototype.splice.call(arguments,2);

		// items not used and hidden for reuse later
		var countReusable = this.allItems.length - this.count

		for(var d=0; d<toAdd.length; d++){
			if(deleteCount <= 0){
				// need to inject new item (reuse one from the end of allItems array, or create new)
				var newItem = countReusable > 0 ? this.allItems.pop():this.makeItem(toAdd[d], index)
				this.allItems.splice(index,0, newItem)
				var next = this.allItems[index+1]
				this.insertBefore(this.allItems[index].el, next ? next.el:null)
				countReusable--
			}
			this.setItem(toAdd[d], index )
			index++
			deleteCount--
		}

		if(deleteCount >0){
			var removed = this.allItems.splice(index,deleteCount)
			for(var i =0; i<removed.length; i++){
				var tmp = removed[i]
				this.insertBefore(tmp.el,this.itemNextSibling||null)
				this.allItems.push(tmp)
				setVisible(tmp, false)
			}
		}
		this.count = Math.max(this.count - deleteCount,0)
		this._fixItemList(true)
	}
}