const Spacebear = artifacts.require("Spacebear"); 
const truffleAssert = require("truffle-assertions"); 
contract("SpacebearTest", (accounts)=>{
    it("Should credit an NFT to a specific account", async()=>{
        const spcInst = await Spacebear.deployed();
        let txResult = await spcInst.safeMint(accounts[1],"spacebear_1.json");
        // assert.equal(txResult.logs[0].event, "Transfer", "Event is not transfer event");
        // assert.equal(txResult.logs[0].args.from, "0x0000000000000000000000000000000000000000", "'From' is not the zero address");

        //THE above two test can be combined to below single line using truffle-assertions:
        truffleAssert.eventEmitted(txResult,"Transfer",{from: "0x0000000000000000000000000000000000000000", to:accounts[1], tokenId:web3.utils.toBN("0")})

        assert.equal(await spcInst.ownerOf(0), accounts[1], "Owner of token 1 is not equal to account 2");
    })
})
