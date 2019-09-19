const Registry = artifacts.require("./test/Registry.sol");

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

contract('registry', function(accounts) {
  let registry;

  beforeEach(async function() {
    registry = await Registry.new();
  });

  it('can express sentiment in ether.', async () => {
    const sentimentValue = web3.utils.toWei('1', 'ether');
    const billyJoel = accounts[0];
    await registry.updateProfile("na", "Billy Joel", {from: billyJoel});
    const philCollins = accounts[1];
    await registry.updateProfile("na", "Phil Collins", {from: philCollins});
    const riverOfDreams = phraseKey(
      await registry.createPhrase("na", "River of Dreams", ZERO_ADDRESS, {from: billyJoel})
    );
    const myFavoriteAlbum = sentimentKey(
      await registry.createSentiment("na", "My Favorite Album", ZERO_ADDRESS, sentimentValue)
    );

    const balanceBefore = await web3.eth.getBalance(billyJoel);

    await registry.expressSentiment(
      riverOfDreams,
      myFavoriteAlbum,
      {from: philCollins, value: sentimentValue}
    );

    const balanceAfter = await web3.eth.getBalance(billyJoel);
    assert.equal(
      sentimentValue, balanceAfter - balanceBefore,
      "Sentiment received for Billy Joel's twelfth studio album, River of Dreams, should have increased his balance by 1 Eth."
    )
  });

  let phraseKey = function(receipt) {
    return receipt.logs[0].args.phrase;
  }

  let sentimentKey = function(receipt) {
    return receipt.logs[0].args.sentiment;
  }
});
