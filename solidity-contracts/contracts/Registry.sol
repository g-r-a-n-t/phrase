pragma solidity >=0.5.0;

import "./ERC20Interface.sol";

contract Registry {
  event PhraseCreated(address creator, bytes20 phrase);
  event SentimentCreated(address creator, bytes20 sentiment);
  event SentimentPinned(address expresser, bytes20 phrase, bytes20 sentiment);

  struct Phrase {
    string format;
    string content;
    address payable creator;
    address payable beneficiary;
    mapping(bytes20 => address[]) pinned;
  }

  struct Sentiment {
    string format;
    string content;
    address token;
    uint256 value;
  }

  mapping(bytes20 => Phrase) public phrases;
  mapping(bytes20 => Sentiment) public sentiments;

  function createPhrase(
    string memory format,
    string memory content,
    address payable beneficiary
  )
    public
  {
    // Create a new phrase.
    Phrase memory phrase = Phrase(
      format,
      content,
      msg.sender,
      beneficiary
    );

    // Create a unique key for the phrase and store it in the global map.
    bytes20 key = phraseKey(phrase);
    phrases[key] = phrase;

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
    bytes20 key = sentimentKey(sentiment);
    sentiments[key] = sentiment;

    emit SentimentCreated(msg.sender, key);
  }

  function pinSentiment(
    bytes20 phraseKey,
    bytes20 sentimentKey
  )
    public
    payable
  {
    // Verify that the phrase, and sentiment exist.
    require(
      phraseExists(phraseKey),
      "Phrase should exist for the given key."
    );
    require(
      sentimentExists(sentimentKey),
      "Sentiment should exist for the given key."
    );

    // Transfer the sentiment's value to the phrases's creator or beneficiary.
    Phrase memory phrase = phrases[phraseKey];
    Sentiment memory sentiment = sentiments[sentimentKey];
    if (phrase.beneficiary == address(0)) {
      transfer(phrase.creator, sentiment.token, sentiment.value);
    } else {
      transfer(phrase.beneficiary, sentiment.token, sentiment.value);
    }

    // Pin the sentiment to a phrase under the msg.sender.
    phrases[phraseKey].pinned[sentimentKey].push(msg.sender);

    emit SentimentPinned(msg.sender, phraseKey, sentimentKey);
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

  function phraseKey(
    Phrase memory phrase
  )
    internal
    pure
    returns (bytes20)
  {
    return bytes20(sha256(abi.encodePacked(
      phrase.format, "-",
      phrase.content, "-",
      phrase.creator, "-",
      phrase.beneficiary
    )));
  }

  function sentimentKey(
    Sentiment memory sentiment
  )
    internal
    pure
    returns (bytes20)
  {
    return bytes20(sha256(abi.encodePacked(
      sentiment.format, "-",
      sentiment.content, "-",
      sentiment.token, "-",
      sentiment.value
    )));
  }

  function phraseExists(
    bytes20 key
  )
    internal
    view
    returns (bool)
  {
    return bytes(phrases[key].content).length != 0;
  }

  function sentimentExists(
    bytes20 key
  )
    internal
    view
    returns (bool)
  {
    return bytes(sentiments[key].content).length != 0;
  }
}
