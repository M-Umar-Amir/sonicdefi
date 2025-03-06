const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MedicalSystem", function () {
  let MedicalSystem;
  let medicalSystem;
  let owner;
  let doctor;
  let patient;

  beforeEach(async function () {
    [owner, doctor, patient] = await ethers.getSigners();
    MedicalSystem = await ethers.getContractFactory("MedicalSystem");
    medicalSystem = await MedicalSystem.deploy();
  });

  it("Should allow the admin to add and remove doctors", async function () {
    await medicalSystem.addDoctor(doctor.address);
    expect(await medicalSystem.doctors(doctor.address)).to.equal(true);

    await medicalSystem.removeDoctor(doctor.address);
    expect(await medicalSystem.doctors(doctor.address)).to.equal(false);
  });

  it("Should allow doctors to add patient records", async function () {
    await medicalSystem.addDoctor(doctor.address);
    await medicalSystem.connect(doctor).addPatient(patient.address, "John Doe", 30, "Healthy");

    const [name, age, medicalHistory] = await medicalSystem.connect(doctor).getPatient(patient.address);
    expect(name).to.equal("John Doe");
    expect(age).to.equal(30);
    expect(medicalHistory).to.equal("Healthy");
  });

  it("Should allow doctors to update patient records", async function () {
    await medicalSystem.addDoctor(doctor.address);
    await medicalSystem.connect(doctor).addPatient(patient.address, "John Doe", 30, "Healthy");

    await medicalSystem.connect(doctor).updatePatientRecord(patient.address, "Cold");
    const [, , updatedHistory] = await medicalSystem.connect(doctor).getPatient(patient.address);
    expect(updatedHistory).to.equal("Cold");
  });
});