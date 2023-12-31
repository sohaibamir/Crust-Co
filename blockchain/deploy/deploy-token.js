const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  let args = [];
  log("--------------------------");
  const rewardToken = await deploy("RewardToken", {
    args: args,
    from: deployer,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying------");
    await verify(rewardToken.address, args);
  }
  log("------------------------------------------");
};
module.exports.tags = ["all", "rewardToken"];
