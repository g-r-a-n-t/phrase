pragma solidity >=0.5.0;

contract Registry {
  struct Phrase {
    string content;
    address creator;
    address beneficiary;
  }

  struct Sentiment {
    string content;
    address token;
    uint256 value;
  }

  struct ExpressedSentiment {
    bytes32 phrase;
    bytes32 sentiment;
  }

  struct Profile {
    string content;
    bytes32[] phrases;
    bytes32[] expressedSentiments;
  }

  mapping(address => Profile) public profiles;
  mapping(bytes32 => Phrase) public phrases;
  mapping(bytes32 => Sentiment) public sentiments;
  mapping(bytes32 => ExpressedSentiment) public expressedSentiments;

  function createProfile(
    string memory content
  )
    public
  {
    // TODO: Assert profile does not exists
    profiles[msg.sender] = Profile(
      content,
      new bytes32[](0),
      new bytes32[](0)
    );
  }

  function createPhrase(
    string memory content,
    address beneficiary
  )
    public
    returns (bytes32)
  {
    // TODO: Assert profile exists
    Phrase memory phrase = Phrase(
      content,
      msg.sender,
      beneficiary
    );

    bytes32 key = hashPhrase(phrase);
    phrases[key] = phrase;
    profiles[msg.sender].phrases.push(key);

    return key;
  }

  function createSentiment(
    string memory content,
    address token,
    uint256 value
  )
    public
    returns (bytes32)
  {
    // TODO: Assert profile exists
    Sentiment memory sentiment = Sentiment(
      content,
      token,
      value
    );

    bytes32 key = hashSentiment(sentiment);
    sentiments[key] = sentiment;

    return key;
  }

  function expressSentiment(
    bytes32 phrase,
    bytes32 sentiment
  )
    public
    payable
    returns (bytes32)
  {
    // TODO: Check if profile exists for sender
    ExpressedSentiment memory expressedSentiment = ExpressedSentiment(
      phrase,
      sentiment
    );

    bytes32 key = hashExpressedSentiment(expressedSentiment);
    // TODO: Check if it already exists
    expressedSentiments[key] = expressedSentiment;
    // TODO: Transfer funds to the phrase as defined in the sentiment
    profiles[msg.sender].expressedSentiments.push(key);

    return key;
  }

  function hashPhrase(Phrase memory phrase)
    private
    pure
    returns (bytes32)
  {
    // TODO: Check what encodedPacked does
    return sha256(
      abi.encodePacked(
        phrase.content, "-", phrase.creator, "-", phrase.beneficiary
      )
    );
  }

  function hashSentiment(Sentiment memory sentiment)
    private
    pure
    returns (bytes32)
  {
    // TODO: Check what encodedPacked does
    return sha256(
      abi.encodePacked(
        sentiment.content, "-", sentiment.token, "-", sentiment.value
      )
    );
  }

  function hashExpressedSentiment(ExpressedSentiment memory expressedSentiment)
    private
    pure
    returns (bytes32)
  {
    // TODO: Check what encodedPacked does
    return sha256(
      abi.encodePacked(
        expressedSentiment.phrase, "-", expressedSentiment.sentiment
      )
    );
  }
}
