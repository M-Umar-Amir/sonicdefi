// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalSystem {

    struct Patient {
        string name;
        uint256 age;
        string medicalHistory;
        address doctor;
    }

    mapping(address => Patient) public patients;
    mapping(address => bool) public doctors;
    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    modifier onlyDoctor() {
        require(doctors[msg.sender], "Only authorized doctors can access.");
        _;
    }

    constructor() {
        admin = msg.sender;
        doctors[msg.sender] = true;
    }

    function addDoctor(address doctor) external onlyAdmin {
        doctors[doctor] = true;
    }

    function removeDoctor(address doctor) external onlyAdmin {
        doctors[doctor] = false;
    }

    function addPatient(address patientAddress, string memory name, uint256 age, string memory medicalHistory) external onlyDoctor {
        patients[patientAddress] = Patient(name, age, medicalHistory, msg.sender);
    }

    function getPatient(address patientAddress) public view onlyDoctor returns (string memory, uint256, string memory) {
        Patient memory p = patients[patientAddress];
        return (p.name, p.age, p.medicalHistory);
    }

    function updatePatientRecord(address patientAddress, string memory newMedicalHistory) external onlyDoctor {
        patients[patientAddress].medicalHistory = newMedicalHistory;
    }
}