// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplierManagement {
    struct Supplier {
        string name;
        string contactInfo;
        bool isApproved;
    }

    address public owner;
    mapping(address => Supplier) public suppliers;

    event SupplierRegistered(address supplierAddress, string name);
    event SupplierApproved(address supplierAddress);
    event SupplierUpdated(address supplierAddress, string name, string contactInfo);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function registerSupplier(address _supplierAddress, string memory _name, string memory _contactInfo) public onlyOwner {
        suppliers[_supplierAddress] = Supplier(_name, _contactInfo, false);
        emit SupplierRegistered(_supplierAddress, _name);
    }

    function approveSupplier(address _supplierAddress) public onlyOwner {
        suppliers[_supplierAddress].isApproved = true;
        emit SupplierApproved(_supplierAddress);
    }

    function updateSupplier(address _supplierAddress, string memory _name, string memory _contactInfo) public onlyOwner {
        suppliers[_supplierAddress].name = _name;
        suppliers[_supplierAddress].contactInfo = _contactInfo;
        emit SupplierUpdated(_supplierAddress, _name, _contactInfo);
    }
}
