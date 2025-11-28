(() => {
  // Load inital data if present
  let data = {}

  try {
    data = JSON.parse(atob(location.hash.slice(1)))
  } catch (e) {
    console.warn(e)
  }

  const setData = (id, value) => {
    // Set data and update URL hash
    data[id] = value
    location.hash = btoa(JSON.stringify(data))
  }
    
  document.querySelectorAll('[hashshare-value]').forEach(el => {
    el.value = data[el.id] ?? ''

    el.addEventListener('input', () => {
      setData(el.id, el.value)
    })
  })
})()
