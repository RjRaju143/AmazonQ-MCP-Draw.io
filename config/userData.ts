export const userDataScript = `#!/bin/bash
set -e

# Update and install packages
apt update

# Write MCP config
sudo -u ubuntu bash -c 'cat > /home/ubuntu/mcp.json <<EOF
{
  "mcpServers": {
    "awslabs.cdk-mcp-server": {
      "command": "uvx",
      "args": [
        "awslabs.cdk-mcp-server@latest"
      ],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      }
    },
    "awslabs.aws-diagram-mcp-server": {
      "command": "uvx",
      "args": [
        "awslabs.aws-diagram-mcp-server"
      ],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "autoApprove": [],
      "disabled": false
    }
  }
}
EOF'

DEBIAN_FRONTEND=noninteractive apt install -y libfuse2 jq wget net-tools curl git unzip zip graphviz

# Change ownership of /opt
chown ubuntu:ubuntu -R /opt

# Download and install Amazon Q
sudo -u ubuntu curl --proto '=https' --tlsv1.2 -sSf https://desktop-release.q.us-east-1.amazonaws.com/latest/amazon-q.deb -o /opt/amazon-q.deb
apt install -y /opt/amazon-q.deb


# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "/opt/awscliv2.zip"
unzip /opt/awscliv2.zip -d /opt/
/opt/aws/install

# Snap installs (snapd should be preinstalled on Ubuntu 22.04)
sudo -u ubuntu bash -c 'sudo snap install astral-uv --classic
sudo -u ubuntu bash -c 'sudo snap install terraform --classic
sudo -u ubuntu bash -c 'sudo snap install kubectl --classic
sudo -u ubuntu bash -c 'sudo snap install helm --classic

# Install k9s
sudo -u ubuntu bash -c "curl -sS https://webi.sh/k9s | sh"

`;
