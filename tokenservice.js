const { Client, PrivateKey,Status,TransactionId,TokenMintTransaction,long,TokenInfoQuery, AccountId,TokenCreateTransaction, AccountCreateTransaction, AccountBalanceQuery, Hbar,AccountInfoQuery, TokenType, TokenSupplyType} = require("@hashgraph/sdk");
require("dotenv").config();
const client = Client.forTestnet();
const myAccountId = AccountId.fromString("0.0.4575516");
const myPrivateKey=PrivateKey.fromString("3030020100300706052b8104000a0422042098b9c2c02219fe094667691ebbf9b1c477ef9f42b7d0a75f240d300d6aea58aa");
client.setOperator(myAccountId, myPrivateKey);

//Create the transaction and freeze for manual signing
async function main() {
console.log("creation de token ");
transaction = await new TokenCreateTransaction()
     .setTokenName("mee")
     .setTokenSymbol("F")
     .setTokenType(TokenType.FungibleCommon)
     .setSupplyType(TokenSupplyType.Infinite)
     .setDecimals(2)
     .setTreasuryAccountId(myAccountId)
     .setInitialSupply(5000)
     .setAdminKey(myPrivateKey)
     .setMaxTransactionFee(new Hbar(30)) 
     .setTokenMemo("hiiiii")
     .freezeWith(client)
    //  .setFeeScheduleKey(newAccountPublicKey);;

//Sign the transaction with the token adminKey and the token treasury account private key
const signTx = (await transaction.sign(myPrivateKey));

//Sign the transaction with the client operator private key and submit to a Hedera network
const txResponse = await signTx.execute(client);

//Get the receipt of the transaction
const receipt = await txResponse.getReceipt(client);

//Get the token ID from the receipt
const tokenId = receipt.tokenId;

console.log("The new token ID is " + tokenId);
// console.log("The new nft" +transaction.getTokenMemo());
const tokenInfo = new TokenInfoQuery()
    .setTokenId(tokenId);
//Submit the query to the network and obtain the token supply
 totalSupply = tokenInfo.execute(client).totalSupply;
console.log("The total supply of this token is " +totalSupply);
//Mint another 1,000 tokens
TokenMintTransaction transaction = new TokenMintTransaction()
    .setTokenId(newTokenId)
    .setAmount(1000);

//Build the unsigned transaction, sign with the supply private key of the token, submit the transaction to a Hedera network
TransactionId transactionId = transaction.build(client).sign(supplyKey).execute(client);
    
//Request the receipt of the transaction
TransactionReceipt getReceipt = transactionId.getReceipt(client);
    
//Obtain the transaction consensus status
Status transactionStatus = getReceipt.status;

System.out.println("The transaction consensus status is " +transactionStatus);
//Version: 1.2.2
}
main();