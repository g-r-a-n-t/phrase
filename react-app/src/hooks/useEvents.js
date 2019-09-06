import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import config from '../config'

const MIN_BLOCK = 0
const PROFILE_CREATED = ethers.utils.id('ProfileCreated(address)')
const PHRASE_CREATED = ethers.utils.id('PhraseCreated(address,bytes32)')
const SENTIMENT_EXPRESSED = ethers.utils.id('SentimentExpressed(address,bytes32)')
const SENTIMENT_CREATED = ethers.utils.id('SentimentCreated(bytes32)')

// TODO refactor so that you can easily switch between providers based on config
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
const registryInterface = new ethers.utils.Interface(config.registry.abi)

// TODO use caching here. each subsequent call with new blocks should build on cache
export function useEvents (topic) {
  const [events, setEvents] = useState(null)

  useEffect(() => {
    fetchLogs(topic, setEvents)
  }, [topic])

  return events
}

export function useCreatedProfiles () {
  return useEvents(PROFILE_CREATED)
}

export function useCreatedPhrase () {
  return useEvents(PHRASE_CREATED)
}

export function useExpressedSentiments () {
  return useEvents(SENTIMENT_EXPRESSED)
}

export function useCreatedSentiments () {
  return useEvents(SENTIMENT_CREATED)
}

async function fetchLogs (topic, setEvents) {
  const filter = {
    address: config.registry.address,
    fromBlock: MIN_BLOCK,
    toBlock: 1000,
    topics: [topic]
  }

  const logs = await provider.getLogs(filter)
  const events = logs.map((log) => registryInterface.parseLog(log).values)

  setEvents(events)
}
