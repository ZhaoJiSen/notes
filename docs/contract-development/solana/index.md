# Solana

### 1. 秘钥对

在 Solana 中，秘钥对可以理解为是一个账户，该账户包含了公钥和私钥两部分，其中公钥用于共享和接收交易，而私钥用于验证账户权限，需要妥善保管。

#### 1.1 创建秘钥对
创建秘钥需要引入第三方库 `@solana/web3.js`，然后通过其中的 `Keypair.generate()` 来创建秘钥对：

```ts
import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

console.log('公钥：', keypair.publicKey.toBase58());
console.log('私钥：', keypair.secretKey);
```

#### 1.2 导入秘钥对
当拥有了一个私钥后，就可以通过 `Keypair.fromSecretKey()` 来导入这私钥：

```ts
import { Keypair } from "@solana/web3.js";

const keypair = Keypair.fromSecretKey(
  Uint8Array.from(('xxx').split(',').map(Number))
);

console.log('公钥：', keypair.publicKey.toBase58());
console.log('私钥：', keypair.secretKey);
```


> [!IMPORTANT]
> 整个秘钥对的作用就是用于验证账户权限，并进行交易签名。

### 2. SOL 代币与网络交互

当与 Solana 网络进行交互时，分为**读取**和**写入**两种类型。读取操作不需要收取任何费用，而写入操作需要支付 Solana 网络的原生代币也就是所谓的 SOL。`1 SOL = 10亿 Lamports`

#### 2.1 连接 Solana 网络
连接 Solana 网络，需要创建一个 connection 对象，该对象接收一个 url 参数，即 Solana 集群的 API URL：
```ts
import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl('devnet'));
```

> [!NOTE]
> 其中 `devnet` 表示的是一种 Solana 的网络类型，除此之外还有 `mainnet`、`testnet` 等。分别代表了开发网、主网和测试网。

#### 2.2 领取测试代币
除开主网外，其余两个网络中的 SOL 是没有价值的，因此通常在 devnet 上进行开发，当有了一个秘钥对后并且连接到网络之后，就可以领取测试代币了。

领取代币也有两种方式，分别是通过代码领取以及网页领取。

通过代码领取：

```ts
import { airdropIfRequired } from '@solana-developers/helpers'; 

const airdrop = 
  await airdropIfRequired(connection, publicKey, amount, mainBalance);
```

通过网页领取网站为：[https://faucet.solana.com/](https://faucet.solana.com/)
