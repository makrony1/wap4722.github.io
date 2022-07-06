const dns = require('dns');

dns.resolve4('www.miu.edu', (err, addresses) => {
  if (err) throw err;

  console.log(`addresses: ${JSON.stringify(addresses[0])}`);
});