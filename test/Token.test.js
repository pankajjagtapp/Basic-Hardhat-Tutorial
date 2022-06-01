const { expect } = require('chai');
const { ethers } = require('hardhat');

let owner;
let addr1;
let addr2;
let addrs;
let TokenInstance;
let hardhatToken;

beforeEach(async () => {
	[owner, addr1, addr2, ...addrs] = await ethers.getSigners();
	TokenInstance = await ethers.getContractFactory('Token');
	hardhatToken = await TokenInstance.deploy();
});

describe('Deployment', () => {
	it('Should check is owner is msg.sender', async () => {
		const OwnerBalance = await hardhatToken.balanceOf(owner.address);
		expect(OwnerBalance).to.equal(await hardhatToken.totalSupply());
	});
});

describe('Transactions', () => {
	it('Should Transfer from addr1 to addr2', async () => {
		await hardhatToken.transfer(addr1.address, 10);
		let addr1Balance = await hardhatToken.balanceOf(addr1.address);
		expect(addr1Balance).to.equal(10);

		await hardhatToken.connect(addr1).transfer(addr2.address, 5);
		let addr2Balance = await hardhatToken.balanceOf(addr2.address);
		expect(addr2Balance).to.equal(5);
	});

	it('Should revert if amount is less than balance', async () => {
		let initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
		await expect(hardhatToken.connect(addr1).transfer(addr2.address, 10)).to.be.revertedWith('Not enough tokens');
        expect(initialOwnerBalance).to.equal(await hardhatToken.balanceOf(owner.address));
    });
});
