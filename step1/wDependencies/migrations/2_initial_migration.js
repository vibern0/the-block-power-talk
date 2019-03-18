const MySystem = artifacts.require("./MySystem.sol");

module.exports = (deployer) => {
    deployer.deploy(MySystem);
};
