const fsProm = require('fs').promises
const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const Registry = artifacts.require('Registry.sol')

module.exports = async function(done) {
  try {
    const registry = await Registry.deployed()
    const accounts = await web3.eth.getAccounts()

    const root = './scripts/content'
    const profilesPath = path.join(root, 'profiles')
    const phrasesPath = path.join(root, 'phrases')
    const profiles = await fsProm.readdir(profilesPath)

    async function createProfile(account, profile) {
      const profilePath = path.join(profilesPath, profile)
      shell.exec(`date > ${profilePath}/time`)
      console.log(`adding ${profile} to IPFS`)
      const cid = shell.exec(`jsipfs add -r -Q ${profilePath} | tr -d "\n"`).stdout
      console.log(`\nadding ${profile} to registry as ${account}`)
      await registry.createProfile('standard', `/ipfs/${cid}`, { from: account })
      console.log(`added ${profile} to registry`)
    }

    async function createPhrase(account, profile, phrase) {
      const phrasePath = path.join(phrasesPath, profile, phrase)
      console.log('phrase path', phrasePath)
      shell.exec(`date > ${phrasePath}/time`)
      console.log(`adding ${phrase} to IPFS`)
      const cid = shell.exec(`jsipfs add -r -Q ${phrasePath} | tr -d "\n"`).stdout
      console.log(`\nadding ${phrase} to registry as ${account}`)
      registry.createPhrase('standard', `/ipfs/${cid}`, account, { from: account }) // TODO beneficiary should be 0
      console.log(`added ${phrase} to registry`)
    }

    // create profiles (max 10) and create phrases
    console.log(`============= Creating Profiles ============`)  
    if(profiles.length <= 10) {
      for (let i = 0; i < profiles.length; i++) {
        console.log(`------------- ${profiles[i]} --------------`)
        await createProfile(accounts[i], profiles[i])
        const profilePhrasesPath = path.join(phrasesPath, profiles[i])
        if (fs.existsSync(profilePhrasesPath)) {
          const phrases = await fsProm.readdir(profilePhrasesPath)
          phrases.forEach(async (phrase) => {
            await createPhrase(accounts[i], profiles[i], phrase)
          })
        }
      }
    } else {
      console.log('too many profiles.')
    }
  } catch (e) {
    console.log('something went wrong: ', e)
  }

  done()
}
