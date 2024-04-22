// // SPDX-License-Identifier: MIT
// pragma solidity =0.6.6;

// import "@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol";
// import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";

// // interface ILiquidityValueCalculator {
// //     function computeLiquidityShareValue(
// //         uint liquidity,
// //         address tokenA,
// //         address tokenB
// //     ) external returns (uint tokenAAmount, uint tokenBAmount);
// // }

// contract P3Helper {
//     address public factory;
//     constructor(address factory_) public {
//         factory = factory_;
//     }

//     function pairInfo(
//         address tokenA,
//         address tokenB
//     ) internal view returns (uint reserveA, uint reserveB, uint totalSupply) {
//         IUniswapV2Pair pair = IUniswapV2Pair(
//             UniswapV2Library.pairFor(factory, tokenA, tokenB)
//         );
//         totalSupply = pair.totalSupply();
//         (uint reserves0, uint reserves1, ) = pair.getReserves();
//         (reserveA, reserveB) = tokenA == pair.token0()
//             ? (reserves0, reserves1)
//             : (reserves1, reserves0);
//     }

//     function computeLiquidityShareValue(
//         uint liquidity,
//         address tokenA,
//         address tokenB
//     ) external view returns (uint tokenAAmount, uint tokenBAmount) {
//         (uint reserveA, uint reserveB, uint totalSupply) = pairInfo(
//             tokenA,
//             tokenB
//         );

//         // 유동성 지분에 해당하는 토큰 금액 계산
//         tokenAAmount = (liquidity * reserveA) / totalSupply;
//         tokenBAmount = (liquidity * reserveB) / totalSupply;
//     }
// }
