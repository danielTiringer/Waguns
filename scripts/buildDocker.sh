#!/bin/bash

# Install basic applications

apt install -yy git curl


# Session specific variants

username="developer"
password="devops"


# Create an user for password only connection


sudo mkdir /home/$username

sudo useradd -d /home/$username -s /bin/bash -p $(openssl passwd -1 $password) $username

sudo chmod 777 /etc/ssh/sshd_config
sudo sed -i "s/PasswordAuthentication no/PasswordAuthentication yes/g" /etc/ssh/sshd_config
sudo echo "AllowUsers ubuntu $username" >> /etc/ssh/sshd_config
sudo chmod 644 /etc/ssh/sshd_config
sudo systemctl restart ssh


# Install Docker

curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker ubuntu $username


# Start the application via Docker

docker run -d -p 3000:3000 danieltiringer/waguns
