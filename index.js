const { createWatcher } = require('@makerdao/multicall');

// Contract addresses used in this example
const TEST_TOKEN = '0x97d537169A3df0AA0838B565c8eAefC2b0Bf6EBd';
const ADDRESS_WITH_BALANCE = '0x1479a759C6961cc18dADAebbd0a0D4695207b5B0';
const ADDRESS_WITH_NO_BALANCE = '0x1111111111111111111111111111111111111111';

const multicallAddress = '0xfFE2FF36c5b8D948f788a34f867784828aa7415D';

// Preset can be 'mainnet', 'kovan', 'rinkeby', 'goerli' or 'xdai'
const config = {
  rpcUrl: 'https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b',
  multicallAddress
};

// Create watcher
const watcher = createWatcher(
  [
    {
      target: TEST_TOKEN,
      call: ['balanceOf(address)(uint256)', ADDRESS_WITH_BALANCE],
      returns: [[`BALANCE_OF_${ADDRESS_WITH_BALANCE}`, val => val / 10 ** 18]]
    },
    {
      target: TEST_TOKEN,
      call: ['balanceOf(address)(uint256)', ADDRESS_WITH_NO_BALANCE],
      returns: [[`BALANCE_OF_${ADDRESS_WITH_NO_BALANCE}`, val => val / 10 ** 18]]
    }
  ],
  config
);

// Subscribe to state updates
watcher.subscribe(update => {
console.log(`Update: ${update.type} = ${update.value}`);
});

// Subscribe to batched state updates
watcher.batch().subscribe(updates => {
  console.log(updates);
});

// Start the watcher polling
watcher.start();


