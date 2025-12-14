;(() => {
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

  document.querySelectorAll('[hashshare]').forEach(el => {
    // If this is an input of some form (input, textarea, etc) then
    if ('value' in el) {
      if (data[el.id]) {
        // Set the element from the provided value in the hash
        el.value = data[el.id]
        // Manually trigger an input event as if a user has entered data
        // into this field
        el.dispatchEvent(new Event('input', { bubbles: true }))
      }

      // Update the URL hash when this input changes
      el.addEventListener('input', () => {
        setData(el.id, el.value)
      })
    }
  })
})()
