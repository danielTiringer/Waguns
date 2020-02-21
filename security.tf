resource "aws_security_group" "ssh_http_https_waguns_group" {
	name					=	"ssh_http_https_waguns_group"
	description		= "Allow SSH, HTTP, HTTPS and 3000"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
		description	=	"SSH"
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
		description	= "HTTP"
  }
  ingress {
    from_port  			= 443
    to_port    			= 443
    protocol   			= "tcp"
    cidr_blocks			= ["0.0.0.0/0"]
		description			=	"HTTPS"
  }
  ingress {
    from_port  			= 3000
    to_port    			= 3000
    protocol   			= "tcp"
    cidr_blocks			= ["0.0.0.0/0"]
		description			=	"App"
  }
  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
		description   	= "Outbound"
  }
}

