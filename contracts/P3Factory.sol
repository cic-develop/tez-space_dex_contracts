// SPDX-License-Identifier: GPL-3.0
pragma solidity =0.5.16;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "./P3Pair.sol";

contract P3Factory is IUniswapV2Factory {
    /**
     *@dev 기존 UniswapV2에서 추가 기능을 구현하기 위해 변수를 추가하였습니다.
     * add variable to implement additional features
     * paymentAmount:<uint>
     * - 페어 생성시에 지불할 토큰의 양을 설정합니다.
     *
     * paymentTokenAddress:<address>
     * - 페어 생성시에 지불할 토큰의 주소를 설정합니다.
     *
     * isCreatePair:<bool>
     * - 페어 생성이 열려있는지 여부를 설정합니다.
     */

    address public paymentTokenAddress;
    uint public paymentAmount;
    bool public isCreatePair;

    modifier isCreatePairCheck() {
        require(isCreatePair, "UniswapV2: PAIR_CREATION_DISABLED");
        _;
    }

    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    event PairCreated(
        address indexed token0,
        address indexed token1,
        address pair,
        uint
    );

    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }

    function createPair(
        address tokenA,
        address tokenB
    ) external isCreatePairCheck returns (address pair) {
        // add payment logic
        IERC20(paymentTokenAddress).transferFrom(
            msg.sender,
            feeTo,
            paymentAmount
        );

        require(tokenA != tokenB, "UniswapV2: IDENTICAL_ADDRESSES");
        (address token0, address token1) = tokenA < tokenB
            ? (tokenA, tokenB)
            : (tokenB, tokenA);
        require(token0 != address(0), "UniswapV2: ZERO_ADDRESS");
        require(
            getPair[token0][token1] == address(0),
            "UniswapV2: PAIR_EXISTS"
        ); // single check is sufficient
        bytes memory bytecode = type(P3Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IUniswapV2Pair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, "UniswapV2: FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, "UniswapV2: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }

    function setP3States(
        address _paymentTokenAddress,
        uint _paymentAmount,
        bool _isCreatePair
    ) external {
        require(msg.sender == feeToSetter, "UniswapV2: FORBIDDEN");
        paymentTokenAddress = _paymentTokenAddress;
        paymentAmount = _paymentAmount;
        isCreatePair = _isCreatePair;
    }
}
