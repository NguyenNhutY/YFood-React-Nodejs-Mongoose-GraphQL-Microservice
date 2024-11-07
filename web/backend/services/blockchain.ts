// services/blockchainService.ts
import { ethers } from "ethers";
import SupplierManagementAbi from "./SupplierManagementAbi.json"; // ABI of your smart contract

const CONTRACT_ADDRESS = "your_contract_address_here";

export const getProvider = () => {
  return new ethers.providers.Web3Provider(window.ethereum);
};

export const getContract = (provider: ethers.providers.Web3Provider) => {
  return new ethers.Contract(
    CONTRACT_ADDRESS,
    SupplierManagementAbi,
    provider.getSigner()
  );
};

export const registerSupplier = async (name: string, contactInfo: string) => {
  const provider = getProvider();
  const contract = getContract(provider);
  await contract.registerSupplier(
    await provider.getSigner().getAddress(),
    name,
    contactInfo
  );
};

// Other functions to interact with the contract
