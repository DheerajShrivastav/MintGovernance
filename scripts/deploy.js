const { ethers } = require('hardhat')
// Governor deployed to 0x53923E73D1EB90d3849Bb9f8aab5B848f87f0526 
// Token deployed to 0xec295037e4ba6DFA18cbEA8deb609DfB6347AB87

async function main() {
  const [deployer] = await ethers.getSigners() // Get the first signer (deployer/owner)

  const transactionCount = await deployer.getTransactionCount()

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: deployer.address,
    nonce: transactionCount + 1,
  })

  const MyGovernor = await ethers.getContractFactory('MyGovernor')
  const governor = await MyGovernor.deploy(futureAddress)

  const MyToken = await ethers.getContractFactory('MyToken')
  const token = await MyToken.deploy(governor.address)

  console.log(
    `Governor deployed to ${governor.address}`,
    `Token deployed to ${token.address}`
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
