import path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';

export class CdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new ecs_patterns.ApplicationLoadBalancedFargateService(
            this,
            'MyWebServer',
            {
                taskImageOptions: {
                    image: ecs.ContainerImage.fromEcrRepository(
                        ecr.Repository.fromRepositoryArn(
                            this,
                            'ECR_repository',
                            'arn:aws:ecr:eu-north-1:564339288753:repository/nextjs-test'
                        ),
                        'latest'
                    ),
                    containerPort: 80,
                },
                publicLoadBalancer: true,
            }
        );
    }
}
