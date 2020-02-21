provider "aws" {
	profile = "waguns"
  access_key = var.aws_credentials[0]
  secret_key = var.aws_credentials[1]
  region     = "eu-west-3"
}

resource "aws_instance" "waguns" {
	count						=	1
  ami           	= "ami-051ebe9615b416c15"
  instance_type 	= "t2.micro"
	security_groups = ["ssh_http_https_waguns_group"]
	tags = {
		Name					=	"Waguns"
	}
  key_name 				= aws_key_pair.waguns.key_name
	user_data				=	file("./scripts/buildDocker.sh")

	connection {
		type					=	"ssh"
		user					=	"ubuntu"
		host					=	"self.public_ip"
		private_key		= file("/home/daniel/.ssh/aws.pem")
	}
}

