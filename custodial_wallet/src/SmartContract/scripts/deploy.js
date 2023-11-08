// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  const custodial = await hre.ethers.deployContract("CustodialFactory", ["0x0576a174D229E3cFA37253523E645A78A0C91B57"]);

  await custodial.waitForDeployment();

  console.log(
    `Custodial Factory deployed to ${custodial.target}`
  );

  const ETHHolder = "0x1b6e16403b06a51C42Ba339E356a64fE67348e92";


  const custodialWallet = await ethers.getContractAt("CustodialInterface", "0x28315c467b82b57f8F3Bad9338C7819b048Ae222");

  const ETHHolderImpersonate = await ethers.getImpersonatedSigner(ETHHolder);

  const string = await custodialWallet.connect(ETHHolderImpersonate).deployWallet(1234);
  console.log(string);
  const string2 = await custodialWallet.connect(ETHHolderImpersonate).hasAnAccountAndReturn();

  console.log(string2);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
