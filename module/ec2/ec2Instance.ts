import * as aws from "@pulumi/aws";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { provider, utils, userDataScript } from "../../config";
import { publicSubnets, vpc } from "../vpc"

const keyName = utils.sshKey.name || "AmazonQ";
const sshDir = path.resolve(utils.sshKey.path || "~", ".ssh");
const privateKeyPath = path.join(sshDir, keyName);
const publicKeyPath = `${privateKeyPath}.pub`;
const securityGroupName = utils.ec2.securityGroup.name;
const ec2Name = utils.ec2.name

if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
    console.log(`SSH key not found. Generating new key pair at ${privateKeyPath}...`);
    execSync(`ssh-keygen -t rsa -b 4096 -f ${privateKeyPath} -N ""`, { stdio: "inherit" });
} else {
    console.log(`SSH key already exists at ${privateKeyPath}`);
}

const publicKey = fs.readFileSync(publicKeyPath, "utf-8");

export const keyPair = new aws.ec2.KeyPair(keyName, {
    keyName,
    publicKey,
}, { provider });

export const ec2SecurityGroup = new aws.ec2.SecurityGroup(securityGroupName, {
    name: securityGroupName,
    vpcId: vpc.id,
    description: "Allow inbound access on specified ports",
    ingress: utils.ec2.securityGroup.inboundPorts.map(port => ({
        protocol: "tcp",
        fromPort: port,
        toPort: port,
        cidrBlocks: ["0.0.0.0/0"],
    })),
    egress: [
        {
            protocol: "-1",
            fromPort: 0,
            toPort: 0,
            cidrBlocks: ["0.0.0.0/0"],
        }
    ],
    tags: { Name: securityGroupName },
}, { provider });

export const ec2Instance = publicSubnets[0].apply(subnet =>
    new aws.ec2.Instance(ec2Name, {
        ami: utils.ec2.amiId,
        instanceType: utils.ec2.instanceType,
        subnetId: subnet.id,
        keyName: keyPair.keyName,
        vpcSecurityGroupIds: [ec2SecurityGroup.id],
        associatePublicIpAddress: true,
        userData: userDataScript,
        tags: { Name: ec2Name },
    }, { provider })
);

