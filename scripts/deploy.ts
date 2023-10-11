import { ethers } from "hardhat";
import hre from "hardhat";

async function deployContract() {
  console.log("Network Name : ", hre.network.name);

  let adminAccount = (await ethers.getSigners())[0];
  let adminAddress = adminAccount.address;
  console.log("Contract Creator : ", adminAddress);

  const peculiumToken = await ethers.getContractFactory(
    "Peculium",
    adminAccount
  );

  const peculiumContract = await peculiumToken.deploy();
  await peculiumContract.waitForDeployment();

  const peculiumAddress = await peculiumContract.getAddress();
  console.log("Peculium Token contract deployed at ", peculiumAddress);
}

deployContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
