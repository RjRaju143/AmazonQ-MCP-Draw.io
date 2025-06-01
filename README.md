# Amazon Q MCP Automation with Pulumi & Draw.io Integration

This project automates the deployment of the **Amazon Q CLI MCP server** using [Pulumi](https://www.pulumi.com/) and TypeScript. It is based on the official AWS guide: [Installing Amazon Q CLI & MCP Server](https://community.aws/content/2x5FTH4rEuKtWz1iRm8RwT9wJq5/installing-amazon-q-cli-setting-up-mcp-server).

It also enables integration with **Draw.io**, allowing architectural diagrams to be visualized and used in context with Amazon Q.

---

## 🚀 Features

- Automated provisioning of Amazon Q MCP server on AWS
- Installs and configures the Amazon Q CLI
- Optional: Integration with Draw.io for diagram-based workflows
- Infrastructure defined as code with Pulumi (TypeScript)

---

## 📁 Project Structure

```

.
├── Pulumi.yaml                  # Pulumi project configuration
├── Pulumi.dev.yaml              # Pulumi stack-specific config
├── index.ts                     # Main Pulumi deployment entry point
├── run.sh                       # shell script

├── config/                      # Configuration helpers and constants
│   ├── index.ts
│   ├── provider.ts
│   └── userData.ts

├── module/                      # Modular infrastructure components
│   ├── ec2/                     # EC2-related resources
│   │   ├── ec2Instance.ts
│   │   └── index.ts
│   └── vpc/                     # VPC-related resources
│       ├── index.ts
│       ├── types.ts
│       └── vpc.ts

└── README.md                    # Project documentation


````

---

## 🧱 Prerequisites

- [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/)
- AWS CLI (configured with access to your AWS account)
- Node.js (>= 16.x recommended)
- `ts-node` (or compile TypeScript to JS)
- Internet access to download Amazon Q CLI

---

## ⚙️ Setup

### 1. Install Dependencies

```bash
yarn install
````

### 2. Configure AWS (if not already)

```bash
aws configure
```

### 3. Deploy the Infrastructure

```bash
pulumi up
```

### or

### 3. Use the shell script `run.sh` for create or destroy the infrastructure

```bash
chmod +x run.sh
./run.sh
```

---

## 🖥️ Installing Amazon Q CLI Manually (Optional)

If needed, you can install the Amazon Q CLI with:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://desktop-release.q.us-east-1.amazonaws.com/latest/amazon-q.deb -o amazon-q.deb
sudo apt install -y ./amazon-q.deb
```

---

## 🧩 Draw\.io Integration

You can use Draw\.io to create architecture diagrams and connect them to Amazon Q sessions by:

1. Creating `.drawio` files and storing them in S3 or a shared repository.
2. Referencing those diagrams in your prompts or documentation inside Amazon Q.

---

## 🔐 Security Notes

* Ensure proper IAM permissions for resources created by Pulumi.
* Validate S3 bucket policies if used for diagram storage.
* Avoid committing secrets or AWS credentials to version control.

---

## 🧹 Clean Up

To destroy the infrastructure:

```bash
pulumi destroy
```

---

## 📄 References

* [Amazon Q CLI & MCP Setup Guide](https://community.aws/content/2x5FTH4rEuKtWz1iRm8RwT9wJq5/installing-amazon-q-cli-setting-up-mcp-server)
* [Pulumi Docs](https://www.pulumi.com/docs/)
* [Draw.io](https://drawio.app/)

---

