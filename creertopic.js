const { Client, PrivateKey,createReceipt,topicId,TopicMessageSubmitTransaction, TransferTransaction,TopicUpdateTransaction,TopicCreateTransaction,AccountId, AccountCreateTransaction, AccountBalanceQuery, Hbar,AccountInfoQuery} = require("@hashgraph/sdk");
require("dotenv").config();
const client = Client.forTestnet();
const OPERATOR_ID = AccountId.fromString("0.0.4575516");
const myAccountId = AccountId.fromString("0.0.4575516");
const submitKey = PrivateKey.generateED25519(); 
const adminKey = PrivateKey.generateED25519(); 
const myPrivateKey=PrivateKey.fromString("3030020100300706052b8104000a0422042098b9c2c02219fe094667691ebbf9b1c477ef9f42b7d0a75f240d300d6aea58aa");
client.setOperator(myAccountId, myPrivateKey);


async function main() {
//Create the transaction
const transaction = new TopicCreateTransaction()
.setTopicMemo("Hello there");

const txResponse = await transaction.execute(client);
const receipt = await txResponse.getReceipt(client);
const newTopicId = receipt.topicId;



const transac = await new TopicUpdateTransaction()
    .setTopicId(newTopicId)
    .setSubmitKey(submitKey)
    .setTopicMemo("goodbye")
    .freezeWith(client);
// //  const signTx = await transac.sign(adminKey);
// //  const txRespons = await signTx.execute(client);
// //  const receip = await txRespons.getReceipt(client);
// // const transactionStatus = receip.status;



//-	Soumettre un message au topic
transa= await new TopicMessageSubmitTransaction()
.setTopicId(newTopicId)
.setMessage("mon message");
//Get the transaction message
const getMessage = transa.getMessage();


console.log("The new topic ID is " + newTopicId);
console.log("The topic memo is " + transaction.getTopicMemo());
console.log("The new memo  " + transac.getTopicMemo());
console.log("le message publié sur le topic "+ getMessage);
}
main();