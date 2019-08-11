pragma solidity >=0.5.0;

import "../Registry.sol";

contract InternalRegistry is Registry {
  function _transfer(
    address payable receiver,
    address token,
    uint256 amount
  )
    public
  {
    super.transfer(receiver, token, amount);
  }

  // In absence of the payable function used to expressSentiment, we have this.
  function() external payable {}
}
