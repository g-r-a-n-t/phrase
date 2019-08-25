pragma solidity >=0.5.0;

import "./ERC20Interface.sol";

contract Registry {
  event PhraseCreated(address creator, bytes32 phrase);
  event SentimentCreated(bytes32 sentiment);
  event SentimentExpressed(address expresser, bytes32 expressedSentiment);
  event ProfileCreated(address creator);

  struct Phrase {
    string format;
    string content;
    address payable creator;
    address payable beneficiary;
  }

  struct Sentiment {
    string format;
    string content;
    address token;
    uint256 value;
  }

  struct ExpressedSentiment {
    bytes32 phrase;
    bytes32 sentiment;
  }

  struct Profile {
    string format;
    string content;
    bytes32[] phrases;
    bytes32[] expressedSentiments;
  }

  mapping(address => Profile) profiles; // Accessed by a getted due to limitations with returing lists.
  mapping(bytes32 => Phrase) public phrases;
  mapping(bytes32 => Sentiment) public sentiments;
  mapping(bytes32 => ExpressedSentiment) public expressedSentiments;

  function createProfile(
    string memory format,
    string memory content
  )
    public
  {
    // Verify that the profile does not already exist.
    require(
      !profileExists(msg.sender),
      "Profile should not exist for the message sender."
    );

    // Create a new profile for the given address.
    profiles[msg.sender].format = format;
    profiles[msg.sender].content = content;

    emit ProfileCreated(msg.sender);
  }

  function createPhrase(
    string memory format,
    string memory content,
    address payable beneficiary
  )
    public
  {
    // Verify that the profile creating the phrase exists.
    require(
      profileExists(msg.sender),
      "Profile should exist for the message sender."
    );

    // Create a new phrase.
    Phrase memory phrase = Phrase(
      format,
      content,
      msg.sender,
      beneficiary
    );

    // Create a unique key for the phrase and store it in the global map.
    bytes32 key = hashPhrase(phrase);
    phrases[key] = phrase;
    profiles[msg.sender].phrases.push(key);

    emit PhraseCreated(msg.sender, key);
  }

  function createSentiment(
    string memory format,
    string memory content,
    address token,
    uint256 value
  )
    public
  {
    // Create a new sentiment.
    Sentiment memory sentiment = Sentiment(
      format,
      content,
      token,
      value
    );

    // Create a unique key for the sentiment and store it in the global map.
    bytes32 key = hashSentiment(sentiment);
    sentiments[key] = sentiment;

    emit SentimentCreated(key);
  }

  function expressSentiment(
    bytes32 phraseKey,
    bytes32 sentimentKey
  )
    public
    payable
  {
    // Verify that the profile, phrase, and sentiment exist.
    require(
      profileExists(msg.sender),
      "Profile should exist for the message sender."
    );
    require(
      phraseExists(phraseKey),
      "Phrase should exist for the given key."
    );
    require(
      sentimentExists(sentimentKey),
      "Sentiment should exist for the given key."
    );

    // Create a new expressed sentiment
    ExpressedSentiment memory expressedSentiment = ExpressedSentiment(
      phraseKey,
      sentimentKey
    );

    // Store the expressed sentiment in the global map, if it isn't already.
    bytes32 expressedSentimentKey = hashExpressedSentiment(expressedSentiment);
    if(!expressedSentimentExists(expressedSentimentKey)) {
      expressedSentiments[expressedSentimentKey] = expressedSentiment;
    }

    // Transfer the sentiment's value to the phrases's creator or beneficiary.
    Phrase memory phrase = phrases[phraseKey];
    Sentiment memory sentiment = sentiments[sentimentKey];
    if (phrase.beneficiary == address(0)) {
      transfer(phrase.creator, sentiment.token, sentiment.value);
    } else {
      transfer(phrase.beneficiary, sentiment.token, sentiment.value);
    }

    // Associate the expressed sentiment with the profile.
    profiles[msg.sender].expressedSentiments.push(expressedSentimentKey);

    emit SentimentExpressed(msg.sender, expressedSentimentKey);
  }

  function transfer(
    address payable receiver,
    address tokenAddress,
    uint256 amount
  )
    internal
  {
    if (tokenAddress == address(0)) {
      receiver.transfer(amount);
    } else {
      ERC20Interface(tokenAddress).transferFrom(msg.sender, receiver, amount);
    }
  }

  function getProfile(
    address owner
  )
    public
    view
    returns (
      string memory,
      string memory,
      bytes32[] memory,
      bytes32[] memory
    )
  {
    return (
      profiles[owner].format,
      profiles[owner].content,
      profiles[owner].phrases,
      profiles[owner].expressedSentiments
    );
  }

  function hashPhrase(
    Phrase memory phrase
  )
    internal
    pure
    returns (bytes32)
  {
    return sha256(
      abi.encodePacked(
        phrase.format, "-",
        phrase.content, "-",
        phrase.creator, "-",
        phrase.beneficiary
      )
    );
  }

  function hashSentiment(
    Sentiment memory sentiment
  )
    internal
    pure
    returns (bytes32)
  {
    return sha256(
      abi.encodePacked(
        sentiment.format, "-",
        sentiment.content, "-",
        sentiment.token, "-",
        sentiment.value
      )
    );
  }

  function hashExpressedSentiment(
    ExpressedSentiment memory expressedSentiment
  )
    internal
    pure
    returns (bytes32)
  {
    return sha256(
      abi.encodePacked(
        expressedSentiment.phrase, "-",
        expressedSentiment.sentiment
      )
    );
  }

  function profileExists(
    address owner
  )
    internal
    view
    returns (bool)
  {
    return bytes(profiles[owner].content).length != 0;
  }

  function phraseExists(
    bytes32 key
  )
    internal
    view
    returns (bool)
  {
    return bytes(phrases[key].content).length != 0;
  }

  function sentimentExists(
    bytes32 key
  )
    internal
    view
    returns (bool)
  {
    return bytes(sentiments[key].content).length != 0;
  }

  function expressedSentimentExists(
    bytes32 key
  )
    internal
    view
    returns (bool)
  {
    return expressedSentiments[key].phrase == "" || expressedSentiments[key].sentiment == "";
  }
}
