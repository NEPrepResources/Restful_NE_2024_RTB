const hre= require('hardhat')

async function main() {
    const EmployeeRegistry=await hre.ethers.getContractFactory("EmployeeRegistry");
    const employeeRegistry= await EmployeeRegistry.deploy();

    await employeeRegistry.waitForDeployment();

    const address= await employeeRegistry.getAddress()
    console.log("EmployeeRegistry deployed at: ", address)
}

main().catch((err)=>{
    console.log(err);
    process.exitCode = 1;
})