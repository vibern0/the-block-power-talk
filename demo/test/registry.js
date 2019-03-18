const Registry = artifacts.require("Registry");

contract("Registry", accounts => {
    //
    let registryInstance;
    //
    before(async () => {
        registryInstance = await Registry.deployed();
    });

    it("add new user", async () => {
        const prevTotalUsers = await registryInstance.totalUsers() * 1;
        await registryInstance.addUser('yourname', { from: accounts[0] });
        const afterTotalUsers = await registryInstance.totalUsers() * 1;
        assert.equal(afterTotalUsers - prevTotalUsers, 1, "Erro!");
    });
});