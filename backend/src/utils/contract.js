const { ethers }= require('ethers');

const provider= new ethers.JsonRpcProvider('http://127.0.0.1:7545');
const privateKey= '0x56e399dd02d4177cb5af34163effbffbc24a2cfdd5374f8a3fd6c9306fc967c0'

const signer= new ethers.Wallet(privateKey, provider)

const contractABI=  [
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "employeeActions",
            "outputs": [
              {
                "internalType": "string",
                "name": "action",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "employeeId",
                "type": "uint256"
              }
            ],
            "name": "getEmployeeAction",
            "outputs": [
              {
                "internalType": "string",
                "name": "action",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "employeeId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "action",
                "type": "string"
              }
            ],
            "name": "recordAction",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }  
];

const contractAddress= '0xe96a03a4FC94d64a8423Dc4F074AFdb72890C064';
const contract= new ethers.Contract(contractAddress, contractABI, signer)


module.exports = contract