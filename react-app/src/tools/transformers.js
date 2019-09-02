
export function sentimentsToPhrases (expressedSentiments) {
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
