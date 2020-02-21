resource "aws_key_pair" "waguns" {
  key_name = "aws"
  public_key = file("/home/daniel/.ssh/aws.pub")
}
