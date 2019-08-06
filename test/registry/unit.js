const Registry = artifacts.require("./test/InternalRegistry.sol");

contract('registry', function(accounts) {
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

  let registry;

  beforeEach(async function() {
    registry = await Registry.new();
  });

  it('should transfer some eth to the receiver when the token address is 0.', async () => {
    const sender = accounts[0];
    const receiver = accounts[1];
    const balanceBefore = await web3.eth.getBalance(receiver);

    const amount = web3.utils.toWei('1', 'ether');
    await web3.eth.sendTransaction({
      from: sender,
      to: registry.address,
      value: amount
    });

    await registry._transfer(receiver, ZERO_ADDRESS, amount);
    const balanceAfter = await web3.eth.getBalance(receiver);

    assert.equal(
      amount, balanceAfter - balanceBefore,
      "The given amount of ether was not transfered to the receiver."
    );
  })
});
