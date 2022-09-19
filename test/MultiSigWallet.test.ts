import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const CONFIRMATIONS_REQUIRED = 2;

describe("MultiSigWallet", function () {
  async function deployMultiSigWalletFixture() {
    const signers = await ethers.getSigners();
    const admin = signers[0];
    const owners = [admin.address, signers[1].address, signers[2].address];

    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    const multiSigWallet = await MultiSigWallet.connect(admin).deploy(owners, CONFIRMATIONS_REQUIRED);
    await multiSigWallet.deployed();

    return { multiSigWallet };
  }
  it(`Should return required number of conformations equal to ${CONFIRMATIONS_REQUIRED}`, async function () {
    const { multiSigWallet } = await loadFixture(deployMultiSigWalletFixture);
    expect(await multiSigWallet.required()).to.equal(CONFIRMATIONS_REQUIRED);
  });
});
