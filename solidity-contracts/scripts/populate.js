const fs = require('fs').promises
const path = require('path')
const shell = require('shelljs')
const Registry = artifacts.require('Registry.sol')

module.exports = async function(callback) {
  const root = './scripts/content'
  const registry = await Registry.deployed()
  const accounts = await web3.eth.getAccounts()

  // create profiles (max 10)
  const profilesPath = path.join(root, 'profiles')
  const profiles = await fs.readdir(profilesPath)
  if(profiles.length <= 10) {
    for (let i = 0; i < profiles.length; i++) {
      const profilePath = path.join(profilesPath, profiles[i])
      shell.exec(`date > ${profilePath}/time`)
      console.log(`adding ${profiles[i]} to IPFS`)
      const cid = shell.exec(`jsipfs add -r -Q ${profilePath} | tr -d "\n"`).stdout
      console.log(`\nadding ${profiles[i]} to registry as ${accounts[i]}`)
      await registry.createProfile('standard', `/ipfs/${cid}`, { from: accounts[i] })
      console.log(`added ${profiles[i]} to registry`)
    }
  }

  callback()
}
