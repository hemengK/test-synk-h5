const { exec } = require('child_process')
const fs = require('fs')

exec('git name-rev --name-only HEAD', (err, branchName, stderr) => {
  if (err) {
    return
  }
  const dateTimeStr = new Date() - 0 + ''
  const version = `${branchName.replace('\n', '')}-${dateTimeStr}`.replace('/', '-')
  fs.writeFile('version.txt', version, () => { })
})
