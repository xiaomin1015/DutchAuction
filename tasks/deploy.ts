import '@nomiclabs/hardhat-waffle';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

task('deploy', 'Deploy Greeter contract').setAction(
  async (_, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const Greeter = await hre.ethers.getContractFactory('Greeter');
    const greeter = await Greeter.deploy(500, '0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f', 10, 30);

    await greeter.deployed();

    console.log('Greeter deployed to:', greeter.address);
  }
);
