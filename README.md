# UNIN Contract

This is the solidity contract portion of the Universal Inventory system or UNIN.

See also:

[UNIN-Client](https://github.com/mrgwiz/unin-client)

[UNIN-API](https://github.com/mrgwiz/unin-api)

## Install Node Modules

```
$ npm install
```

## Compiling the Contract

```
$ npx hardhat compile
Compiled 16 Solidity files successfully
```

## Launching the Test Node


```shell
npx hardhat node
```

Running unit tests.
> TODO

```shell
npx hardhat test
```

## Deploying the Contract

```shell
cp hardhat.config.example.js hardhat.config.js
```

Update hardhat network configuration for localhost.

```
$ npx hardhat node
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

Copy the url (ex `http://127.0.0.1:8545/`) and add one of the private keys to the accounts array (ex `0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a`).


```shell
npx hardhat run scripts/deploy.js
```

Check in one the terminal your node is running from and you should see something like this:

```
  Contract deployment: Unin
  Contract address:    0x663f3ad617193148711d28f5334ee4ed07016602
  Transaction:         0x4a0350993a5ad44c66a861e61d7921ac519bc120da033c68f376406297bc2623
  From:                0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc
  Value:               0 ETH
  Gas used:            3503648 of 3503648
  Block #1:            0xa2ed801a1196fec93b08a7ba531902518a420e1b2d48c6060ae959fcdb0cdaea
```

## Running Scripts

Create a `.env` file at the root of your project with the deployed contracts address.  The price setting is uused when running the `updatePrice` script.

```ini
CONTRACT="0x663f3ad617193148711d28f5334ee4ed07016602"
PRICE="0.01"
```

### Getting the Price

```
$ npx hardhat run scripts/getPrice.js
BigNumber { value: "10000000000000000" }
```

### Updating the Price

```
$ npx hardhat run scripts/updatePrice.js
{
  to: '0x663F3ad617193148711d28f5334eE4Ed07016602',
  from: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  contractAddress: null,
  transactionIndex: 0,
  gasUsed: BigNumber { value: "26182" },
  logsBloom: '0xLOTSOFZEROES',
  blockHash: '0x27eea323833368431f23902b902fc8d6b16e57ba8536c6b4eaa44520207c6a8b',
  transactionHash: '0xeea59cd36e52226074641ada163fe7a89ee98f7ca34dd3f76795f94f48e9d11f',
  logs: [],
  blockNumber: 5,
  confirmations: 1,
  cumulativeGasUsed: BigNumber { value: "26182" },
  effectiveGasPrice: BigNumber { value: "530448592" },
  status: 1,
  type: 2,
  byzantium: true,
  events: []
}
Updated price to 0.01
```

