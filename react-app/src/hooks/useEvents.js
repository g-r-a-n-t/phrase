import { useEffect, useState, useMemo } from 'react'
import { ethers } from 'ethers'

import { useExpressedSentiments as useESEntities } from './useEntities'
import config from 'config'

const MIN_BLOCK = 0
const PROFILE_CREATED = ethers.utils.id('ProfileCreated(address)')
const PHRASE_CREATED = ethers.utils.id('PhraseCreated(address,bytes32)')
const SENTIMENT_EXPRESSED = ethers.utils.id('SentimentExpressed(address,bytes32)')
const SENTIMENT_CREATED = ethers.utils.id('SentimentCreated(address,bytes32)')

// TODO refactor so that you can easily switch between providers based on config
const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545')
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

export function useCreatedPhrases () {
  return useEvents(PHRASE_CREATED)
}

export function useExpressedSentiments () {
  return useEvents(SENTIMENT_EXPRESSED)
}

export function useCreatedSentiments () {
  return useEvents(SENTIMENT_CREATED)
}

export function useExtExpressedSentiments () {
  const events = useExpressedSentiments()
  const keys = useMemo(() => {
    return events ? events.map(e => e.expressedSentiment) : null
  }, [events]) // useMemo required to prevent endless rerenders
  const entities = useESEntities(keys)

  if (entities == null) return null

  return events.map(e => {
    return {
      expresser: e.expresser,
      phrase: entities[e.expressedSentiment].phrase,
      sentiment: entities[e.expressedSentiment].sentiment,
      expressedSentiment: e.expressedSentiment
    }
  })
}

async function fetchLogs (topic, setEvents) {
  const filter = {
    address: config.registry.address,
    fromBlock: MIN_BLOCK,
    toBlock: 1000,
    topics: [topic]
  }

  const logs = await provider.getLogs(filter)
  const events = logs.map(log =>
    registryInterface.parseLog(log).values
  ).reverse()

  setEvents(events)
}
