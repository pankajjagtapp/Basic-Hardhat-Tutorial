async function main() {
	const [deployer] = await ethers.getSigners();

	const TokenInstance = await ethers.getContractFactory('Token');
	const Token = await TokenInstance.deploy();
	console.log('deployed!', Token.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
			console.log(error);
			process.exit(1);
		}
    );
