// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const SupplierManagement = await ethers.getContractFactory(
    "SupplierManagement"
  );
  const supplierManagement = await SupplierManagement.deploy();

  console.log("SupplierManagement deployed to:", supplierManagement.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
