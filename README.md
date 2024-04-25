# Truffle-SpacebearContract
Truffle and Hardhat are JS based tools for blockhain dev. Truffle is an opensource blockchain development framework for Ethereum. It is a contract oriented dev evt, asset pipelining and a testing framework. 

## Installation
Truffle needs some prerequisites like Nodejs, npm, Git etc. Full doc of installing truffle and its dependencies are [here](https://ethereum-blockchain-developer.com/2022-06-nft-truffle-hardhat-foundry/02-prerequisites-truffle-hardhat-foundry/).

After installing prerequisites, Truffle can be installed with `npm install -g truffle`.
Then do `truffle init` .This will download a scaffolding project from github and initialize the directory with the default folder structure:
1. There's a `contracts` folder, which contains the Smart Contracts
2. There is a `migrations` folder, which contains scripts to deploy the contracts
3. There is a `tests` folder, which contains the unit tests
4. There is a config file named `truffle-config.js` which contains sensible defaults.

Then do

`npm init -y`

`echo "node_modules" > .gitignore`

`npm install --save @openzeppelin/contracts`

The above commands initialises a nodejs to add a package.json and adds additional packages like openzeppelin contracts.

## Running our Spacebear Contract 
We have our contract file in [contracts/Spacebear.sol](contracts/Spacebear.sol).

And then type: `truffle compile`

After compilation, you should have a build/contracts folder, containing contract artifacts.
1. Truffle downloads a solidity compiler in the background (the version is defined in truffle-config).
2. Then it looks in the contracts folder for all solidity files and runs them through the solidity compiler.
3. From the compiled contracts it creates json-artifacts, which contain not only the ABI, but also the bytecode and the AST and much more.
4. When we deploy the code using truffle migrations, it will also contain the contract address on a specific network. Truffle will take care of this.

## Deploy the Spacebear contract using Truffle
Deployement in truffle is aka migrations. The migrations file is a set of rules that lets truffle know how to deploy something.

To run the migrations on this test chain, just do `migrate`. 

Instead of develop, we have another test chain called Ganache that comes with truffle suite.

We have the mogrations file in [migrations/01-spacebear-deployment.js](migrations/01-spacebear-deployment.js).

Truffle comes with an internal test blockhain called develop. Start this on a new terminal with `truffle develop`.


