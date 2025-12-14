;(async () => {
  async function encode(text) {
    let stream = new Blob([text]).stream()

    stream = stream.pipeThrough(new CompressionStream('deflate-raw'))
    const res = await new Response(stream)

    const blob = await res.blob()
    const buffer = await blob.arrayBuffer()

    return ';' + btoa(String.fromCharCode(...new Uint8Array(buffer)))
  }

  async function decode(text) {
    if (text[0] != ';') return atob(text)

    text = text.slice(1)

    const binary = Uint8Array.from(atob(text), c => c.charCodeAt(0))

    let stream = new Blob([binary]).stream()

    stream = stream.pipeThrough(new DecompressionStream('deflate-raw'))

    const res = await new Response(stream)
    const blob = await res.blob()

    return await blob.text()
  }

  // Load inital data if present
  let data = {}

  try {
    let json = await decode(location.hash.slice(1))

    // Add curly braces as needed
    if (json[0] != '{') json = '{' + json
    if (json.slice(-1) != '}') json = json + '}'

    data = JSON.parse(json)
  } catch (e) {
    console.warn(e)
  }

  const setData = async (id, value) => {
    // Set data and update URL hash
    data[id] = value
    let json = JSON.stringify(data)
    // We will always have an outer object, so strip `{` and `}`
    let stripped_json = json.slice(1, -1)
    location.hash = await encode(stripped_json)
  }

  document.querySelectorAll('[hash-share]').forEach(el => {
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
