import { aws } from "./config";

//VPC
import { vpc, igw, publicSubnets, privateSubnets, natGateway, natEip } from "./module/vpc";
export const vpcId = vpc.id;
export const igwId = igw.id;
export const nateip = natEip.id;
export const natGwId = natGateway.id;
export const publicSubnetsIds = publicSubnets.apply((subnets: aws.ec2.Subnet[]) => subnets.map((subnet: aws.ec2.Subnet) => subnet.id));
export const privateSubnetsIds = privateSubnets.apply((subnets: aws.ec2.Subnet[]) => subnets.map((subnet: aws.ec2.Subnet) => subnet.id));

//EC2 Instance
import { ec2Instance } from "./module/ec2"
export const ec2 = ec2Instance;
