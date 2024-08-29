// migrations/2_deploy_contracts.js
const SupplierManagement = artifacts.require("SupplierManagement");

module.exports = function (deployer) {
  deployer.deploy(SupplierManagement);
};
