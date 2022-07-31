export default (comp, delay) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(comp), delay)
  })
}
