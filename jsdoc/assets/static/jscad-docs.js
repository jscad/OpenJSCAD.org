function addOpenClassToOpenNavItems () {
  const file = window.location.pathname.split('/').pop().replace(/\.html/, '')
  document.querySelectorAll('nav > ul > li > a').forEach(function (parent) {
    if (parent.parentNode.querySelectorAll('ul li').length) {
      const href = parent.attributes.href.value.replace(/\.html/, '')
      if (file === href) {
        parent.parentNode.className = 'collapsable open'
      } else {
        parent.parentNode.className = 'collapsable'
      }
    }
  })
}

addOpenClassToOpenNavItems()
