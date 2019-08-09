const Registry = artifacts.require("./test/InternalRegistry.sol");
const Token = artifacts.require("./test/FixedSupplyToken.sol");

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

contract('registry', function(accounts) {
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

    await registry._transfer(receiver, ZERO_ADDRESS, amount, {from: sender});
    const balanceAfter = await web3.eth.getBalance(receiver);

    assert.equal(
      amount, balanceAfter - balanceBefore,
      "The given amount of ether was not transfered to the receiver."
    );
  });

  it('should transfer tokens to the receiver when the token address is not 0.', async () => {
    const sender = accounts[0];
    const receiver = accounts[1];
    const amount = 100000;

    const token = await Token.new({from: sender});

    const balanceBefore = await token.balances.call(receiver);

    await token.approve(registry.address, amount, {from: sender});
    await registry._transfer(receiver, token.address, amount, {from: sender});

    const balanceAfter = await token.balances.call(receiver);

    assert.equal(
      balanceAfter - balanceBefore, amount,
      "The given amount of FixedSupplyToken was not transfered to the receiver."
    )
  })

});
