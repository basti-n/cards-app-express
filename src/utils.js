export function get(selector, target = document) {
  return target.querySelector(selector)
}

export function getAll(selector, target = document) {
  return target.querySelectorAll(selector)
}

export function createEl({
  target = get('#app'),
  type = 'div',
  className = [],
  position = 'beforeend',
  innerHTML = null,
  href = null,
  id = null,
  dataPage = null
}) {
  const el = document.createElement(type)
  el.classList.add(...className)
  el.innerHTML = innerHTML
  el.href = href
  el.id = id
  el.dataset.page = dataPage
  target.insertAdjacentElement(position, el)

  return el
}
