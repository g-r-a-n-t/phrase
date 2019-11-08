import { useEffect, useState, useMemo } from 'react'
import { ethers } from 'ethers'
import { useWeb3Context } from 'web3-react'

import { useExpressedSentiments as useESEntities } from './useEntities'
import config from 'config'

const MIN_BLOCK = 0
const PROFILE_CREATED = ethers.utils.id('ProfileCreated(address)')
const PHRASE_CREATED = ethers.utils.id('PhraseCreated(address,bytes32)')
const SENTIMENT_EXPRESSED = ethers.utils.id('SentimentExpressed(address,bytes32)')
const SENTIMENT_CREATED = ethers.utils.id('SentimentCreated(address,bytes32)')

// TODO use caching here. each subsequent call with new blocks should build on cache
export function useEvents (topic) {
  const { library } = useWeb3Context()
  const [events, setEvents] = useState(null)

  useEffect(() => {
    fetchLogs(library, topic, setEvents)
  }, [library, topic])

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

async function fetchLogs (library, topic, setEvents) {
  const registryInterface = new ethers.utils.Interface(config.registry.abi)

  const filter = {
    address: config.registry.address,
    fromBlock: MIN_BLOCK,
    topics: [topic]
  }

  const logs = await library.getLogs(filter)
  const events = logs.map(log =>
    registryInterface.parseLog(log).values
  ).reverse()

  setEvents(events)
}
