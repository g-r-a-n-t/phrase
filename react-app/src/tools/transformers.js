
export function sentimentToPhrasesMap (expressedSentiments) {
  const map = {}

  expressedSentiments.forEach((expressedSentiment) => {
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
  return Object.keys(map).map((key) => {
    return {
      sentiment: key,
      phrases: map[key]
    }
  })
}
