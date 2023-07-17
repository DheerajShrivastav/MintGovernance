const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { ethers } = require('hardhat')
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils

const contractAddress = '0x53923E73D1EB90d3849Bb9f8aab5B848f87f0526'
const tokenAddress = '0xec295037e4ba6DFA18cbEA8deb609DfB6347AB87'
const contractName = 'MyGovernor'
const tokenName = 'MyToken'

async function main() {
  const [owner] = await ethers.getSigners()
  const governor = await hre.ethers.getContractAt(contractName, contractAddress)
  const token = await hre.ethers.getContractAt(tokenName, tokenAddress)
  const tx = await token.delegate(owner.address)
  console.log(tx)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
