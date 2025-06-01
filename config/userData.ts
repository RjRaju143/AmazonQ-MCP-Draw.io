const user: string = "ubuntu"

export const userDataScript = `
#!/bin/bash
set -e

apt update
apt install -y libfuse2 jq wget net-tools curl git unzip zip graphviz

chown ${user}:${user} -R /opt

sudo -u ${user} curl --proto '=https' --tlsv1.2 -sSf https://desktop-release.q.us-east-1.amazonaws.com/latest/amazon-q.deb -o /opt/amazon-q.deb
apt install -y /opt/amazon-q.deb

snap install astral-uv --classic
snap install terraform --classic
snap install kubectl --classic
snap install helm --classic

sudo -u ${user} bash -c 'curl -sS https://webi.sh/k9s | sh'

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "/opt/awscliv2.zip"
unzip /opt/awscliv2.zip -d /opt/
/opt/aws/install

sudo -u ${user} bash -c 'cat <<EOF > /home/${user}/mcp.json
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
`
