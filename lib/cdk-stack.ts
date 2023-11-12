import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';

export interface CdkStackProps extends cdk.StackProps {
    image?: {
        repository?: string;
        tag?: string;
    };
}

export class CdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: CdkStackProps) {
        super(scope, id, props);

        new ecs_patterns.ApplicationLoadBalancedFargateService(
            this,
            'MyWebServer',
            {
                taskImageOptions: {
                    image: ecs.ContainerImage.fromEcrRepository(
                        ecr.Repository.fromRepositoryName(
                            this,
                            'NextjsRepository',
                            props?.image?.repository ?? 'nextjs-test'
                        ),
                        props?.image?.tag ?? 'latest'
                    ),
                    containerPort: 4200,
                },
                publicLoadBalancer: true,
            }
        );
    }
}
