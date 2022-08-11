module.exports = async function readStdin() {
  return new Promise((resolve, reject) => {
    let data = ''
    process.stdin.on('data', d => data += d.toString())
    process.stdin.on('error', reject)
    process.stdin.on('end', () => resolve(data))
    return data
  })
}
