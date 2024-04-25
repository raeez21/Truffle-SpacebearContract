//Gets all the needed code and infor to deploy the SC from build/Spacebear.json file
const Spacebear = artifacts.require("Spacebear"); 
const Spacebear_DEBUG = artifacts.require("Spacebear_DEBUG"); 




module.exports = function(deployer, network, accounts){
    console.log(network, accounts);
    deployer.deploy(Spacebear, accounts[0]);
    deployer.deploy(Spacebear_DEBUG, accounts[0])
}