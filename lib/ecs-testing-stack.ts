import * as cdk from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { Interface } from "readline";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class EcsTestingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);
    const vpc = new Vpc(this, "Vpc", {
      maxAzs: 2,
    });

    const cluster = new cdk.aws_ecs.Cluster(this, "Cluster", {
      vpc,
    });
    const taskDefinition = new cdk.aws_ecs.FargateTaskDefinition(
      this,
      "TaskDefinition",
      {
        memoryLimitMiB: 512,
        cpu: 256,
      }
    );

    const repository = cdk.aws_ecr.Repository.fromRepositoryName(
      this,
      "MyEcrRepo",
      "nishanthgoud/simpleapp"
    );

    const container = taskDefinition.addContainer("DefaultContainer", {
      image: cdk.aws_ecs.ContainerImage.fromEcrRepository(repository),
      logging: new cdk.aws_ecs.AwsLogDriver({
        streamPrefix: "DefaultContainerLogGroup",
      }),
    });

    container.addPortMappings({
      containerPort: 3000,
    });

    const fargateService = new cdk.aws_ecs.FargateService(
      this,
      "FargateService",
      {
        cluster,
        taskDefinition,
        assignPublicIp: true,
        desiredCount: 1,
      }
    );

    const loadBalancer =
      new cdk.aws_elasticloadbalancingv2.ApplicationLoadBalancer(
        this,
        "LoadBalancer",
        {
          vpc,
          internetFacing: true,
        }
      );

    const listener = loadBalancer.addListener("Listener", {
      port: 80,
      open: true,
    });

    listener.addTargets("ECS", {
      port: 80,
      targets: [fargateService],
      healthCheck: {
        path: "/health", // This must match your app's health check endpoint
        interval: cdk.Duration.seconds(30),
        timeout: cdk.Duration.seconds(5),
        healthyThresholdCount: 2,
        unhealthyThresholdCount: 2,
      },
    });

    new cdk.CfnOutput(this, "LoadBalancerDNS", {
      value: loadBalancer.loadBalancerDnsName,
    });
  }
}
