
export function unique (l) {
  return Array.from(new Set(l))
}

export function sentimentToPhrasesMap (expressedSentiments) {
  const map = {}

  expressedSentiments.forEach(expressedSentiment => {
    if (map[expressedSentiment.sentiment] === undefined) {
      map[expressedSentiment.sentiment] = [expressedSentiment.phrase]
    } else {
      map[expressedSentiment.sentiment].push(expressedSentiment.phrase)
    }
  })

  return map
}

export function sentimentToPhrasesList (expressedSentiments) {
  const map = sentimentToPhrasesMap(expressedSentiments)
  return Object.keys(map).map(key => {
    return {
      sentiment: key,
      phrases: map[key]
    }
  })
}

export function creatorToPhrasesMap (createdPhrases) {
  const map = {}

  createdPhrases.forEach(createdPhrase => {
    if (map[createdPhrase.creator] === undefined) {
      map[createdPhrase.creator] = [createdPhrase.phrase]
    } else {
      map[createdPhrase.creator].push(createdPhrase.phrase)
    }
  })

  return map
}

export function creatorToPhrasesList (createdPhrases) {
  const map = creatorToPhrasesMap(createdPhrases)
  return Object.keys(map).map(key => {
    return {
      creator: key,
      phrases: map[key]
    }
  })
}

export function sentimentToExpressersMap (expressedSentimentsExt) {
  const map = {}

  expressedSentimentsExt.forEach(es => {
    if (map[es.sentiment] === undefined) {
      map[es.sentiment] = [es.expresser]
    } else {
      map[es.sentiment].push(es.expresser)
      map[es.sentiment] = unique(map[es.sentiment])
    }
  })

  return map
}

export function sentimentToExpressersList (expressedSentimentsExt) {
  const map = sentimentToExpressersMap(expressedSentimentsExt)
  return Object.keys(map).map(key => {
    return {
      sentiment: key,
      expressers: map[key]
    }
  })
}
