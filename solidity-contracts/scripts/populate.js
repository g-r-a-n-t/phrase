const fsProm = require('fs').promises
const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const Registry = artifacts.require('Registry.sol')

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

module.exports = async function(done) {
  try {
    const registry = await Registry.deployed()
    const accounts = await web3.eth.getAccounts()

    const root = './scripts/content'

    const profilesPath = path.join(root, 'profiles')
    const phrasesPath = path.join(root, 'phrases')
    const sentimentsPath = path.join(root, 'sentiments')

    async function updateProfile(account, profile) {
      try {
        const profilePath = path.join(profilesPath, profile)
        shell.exec(`date > ${profilePath}/time`)
        console.log(`adding ${profile} to IPFS`)
        const cid = shell.exec(`jsipfs add -r -Q ${profilePath} | tr -d "\n"`).stdout
        console.log(`\nadding ${profile} to registry as ${account}`)
        await registry.updateProfile('ipfs-standard-2019', `/ipfs/${cid}`, { from: account })
        console.log(`added ${profile} to registry`)
      } catch (e) {
        console.log('something went wrong ', e)
      }
    }

    async function createPhrases(account, profile, format) {
      try {
        const profilePhrasesPath = path.join(phrasesPath, profile, format)
        if (fs.existsSync(profilePhrasesPath)) {
          const phrases = await fsProm.readdir(profilePhrasesPath)
          for (let i = 0; i < phrases.length; i++) {
            console.log(`-- ${phrases[i]} --`)
            await createPhrase(account, profile, phrases[i], format)
          }
        } else {
          console.log(`no phrases of format ${format} to create`)
        }
      } catch (e) {
        console.log('something went wrong ', e)
      }
    }

    async function createPhrase(account, profile, phrase, format) {
      try {
        const phrasePath = path.join(phrasesPath, profile, format, phrase)
        console.log('phrase path', phrasePath)
        shell.exec(`date > ${phrasePath}/time`)
        console.log(`adding ${phrase} to IPFS`)
        const cid = shell.exec(`jsipfs add -r -Q ${phrasePath} | tr -d "\n"`).stdout
        console.log(`\nadding ${phrase} to registry as ${account}`)
        const receipt = await registry.createPhrase(format, `/ipfs/${cid}`, account, { from: account }) // TODO beneficiary should be 0
        console.log(`added ${phrase} to registry`)
        console.log(`registry key: ${receipt.logs[0].args.phrase}`)
      } catch (e) {
        console.log('something went wrong ', e)
      }
    }

    async function createSentiment(sentiment) {
      try {
        const sentimentPath = path.join(sentimentsPath, sentiment)
        console.log('sentiment path', sentimentPath)
        shell.exec(`date > ${sentimentPath}/time`)
        console.log(`adding ${sentiment} to IPFS`)
        const cid = shell.exec(`jsipfs add -r -Q ${sentimentPath} | tr -d "\n"`).stdout
        console.log(`\nadding ${sentiment} to registry`)
        const receipt = await registry.createSentiment('ipfs-standard-2019', `/ipfs/${cid}`, ZERO_ADDRESS, web3.utils.toWei('1','ether'))
        console.log(`added ${sentiment} to registry`)
        console.log(`registry key: ${receipt.logs[0].args.sentiment}`)
      } catch (e) {
        console.log('something went wrong ', e)
      }
    }

    const profiles = await fsProm.readdir(profilesPath)
    // create profiles (max 10) and create phrases
    console.log(`============= Creating Profiles ============`)
    if(profiles.length <= 10) {
      for (let i = 0; i < profiles.length; i++) {
        console.log(`------------- ${profiles[i]} --------------`)
        await updateProfile(accounts[i], profiles[i])
        await createPhrases(accounts[i], profiles[i], 'ipfs-plaque-2019')
        await createPhrases(accounts[i], profiles[i], 'ipfs-album-2019')
      }
    } else {
      console.log('too many profiles.')
    }

    console.log(`\n============= Creating Sentiments ============`)
    const sentiments = await fsProm.readdir(sentimentsPath)
    for (let i = 0; i < sentiments.length; i++) {
      console.log(`------------- ${sentiments[i]} --------------`)
      await createSentiment(sentiments[i])
    }
  } catch (e) {
    console.log('something went wrong: ', e)
  }

  done()
}
