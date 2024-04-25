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
We have the migrations file in [migrations/01-spacebear-deployment.js](migrations/01-spacebear-deployment.js).

Truffle comes with an internal blockchain called develop. To access this: `truffle develop` (this starts a console wiz connected to the chain)

To run the migrations on this test chain, just do `migrate`. 

Instead of develop, we have another test chain called Ganache. Install ganache with `npm install -g ganache`. To run Ganache simply do `ganache`.

To instruct truffle to deploy to this new ganache network, add some details of this network in the `networks` field of [truffle-config.js](truffle-config.js) file. And on a second terminal do `truffle migrate --network ganache`. This will migrate our contracts to Ganache network.


## Interact with deployed contracts

Truffle has an integrated and interactive JavaScript console with which we can interact with deployed SCs. To get into console do `truffle console --network ganache`.  This opens a JS console where we can type commands and interact with the SC. It has lot of things injected magically (like web3 objects etc.).

Now we will interact with our Spacebear contract and mint a new token:

```
const spacebearInstance = await Spacebear.deployed()
const accounts = await web3.eth.getAccounts();
await spacebearInstance.safeMint(accounts[1], "spacebear_1.json");
```
It automatically assumes you take the first account to send the transaction. We can now view details of NFT token just minted:
`spacebearInstance.ownerOf(0);`

`spacebearInstance.tokenURI(0);`

## Unit Tests
Truffle can do tests in JavaScript and Solidity. The problem with the Solidity tests with Truffle is, they can't really influence much of the transaction structure. You can't choose the account you're sending the TX from in Solidity. You can't modify anything on the chain. And you can't listen to events.

We will stick to the JavaScript tests. A test script can be found in [test/Spacebear.test.js](test/Spacebear.test.js).

During testing Truffle will automatically redeploy the contracts based on migration files. If you still have the truffle console open, then simply type in `test`. You will see the test results. 

## Deploy the SC to a actual test network (Sepolia)

Ganache is actually 2 things in one:
1. It is a wallet, which can do signTransaction
2. It is a blockchain, at least a simulation of one, good enough to test Smart Contract behavior.

To deploy our SC to a real blockchain we have 2 methods:
1. Use Truffle to sign Transactions and connect to a blockchain node, either self-hosted or hosted. This way we need to either give Truffle a private key or the seed phrase. And you will need to download and run a node or need to sign up to a service like Infura, Alchemy or Pocket Network - there are many more. We use Infura here.
2. Use Truffle Dashboard and connect MetaMask

## Method 1
We sign up with Infura which runs blockhain nodes for us. 

The first thing we need to do is instruct Truffle to sign a transaction before sending it. This is best done with a small npm module called HDWallet-Provider.
```
npm install @truffle/hdwallet-provider
touch .secret
echo ".secret" >> .gitignore
touch .infura
echo ".infura" >> .gitignore
```
inside [truffle-config.js](truffle-config.js) we make some changes:
```
const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require('fs');
const mnemonicPhrase = fs.readFileSync(".secret").toString().trim();
const infuraProjectID = fs.readFileSync(".infura").toString().trim();
```
also add below lines in networks field of [truffle-config.js](truffle-config.js)
```
sepolia: {
      provider: () => new HDWalletProvider({
      mnemonic: {
      phrase: mnemonicPhrase
      },
      providerOrUrl: `https://sepolia.infura.io/v3/${infuraProjectID}`
      }),
      network_id: 11155111, // Sepolia's network ID
      confirmations: 2, // Set the number of confirmations needed for a transaction
      timeoutBlocks: 200, // Set the timeout for transactions
      skipDryRun: true // Skip the dry run option
     }
```

The above code creates 2 new file .secrets (which has seed phrase of Metamask) and .infura (api key from Infura.io). We also added the Sepolia chain details to the networks field.
Now do `truffle console --network sepolia` and just do `migrate`. This will deploy our contracts to Sepolia test chain. 

## Method 2 (Using truffle dashboards)
Truffle dashboard connects Truffle to MetaMask directly.

On one terminal do: `truffle dashboard`
which will open an RPC tunnel to a website where MetaMask can connect to. Connect your Metamask wallet, 

Now do `truffle migrate --network dashboard`
This will create a txn to deploy your SC. You need to confirm this txn with Metamask.
