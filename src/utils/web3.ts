// import {ethers} from 'ethers';

// const USDC_ABI = [
//   "function transfer(address to, uint256 amount) public returns (bool)"
// ];

// export async function sendUSDC(wallet, recipient, amount) {
//   const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL);
//   const signer = wallet.getSigner(provider);
//   const usdcContract = new ethers.Contract(
//     process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
//     USDC_ABI,
//     signer
//   );

//   const tx = await usdcContract.transfer(recipient, ethers.utils.parseUnits(amount, 6));
//   await tx.wait();
//   return tx.hash;
// }
const tx = 1;
