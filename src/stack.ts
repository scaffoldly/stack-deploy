import { Construct } from 'constructs';
import { TerraformStack } from 'cdktf';

import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
// import { LambdaFunction } from '@cdktf/provider-aws/lib/lambda-function';

// import { ServerlessApiStage } from '../.gen/modules/scaffoldly/aws/serverless-api-stage';
// import { ServerlessApiGatewayDeploy } from '../.gen/modules/scaffoldly/aws/serverless-api-gateway-deploy';
// import { S3Sync } from "../.gen/modules/scaffoldly/aws/s3-sync";

type InfrastructureOpts = {
  stage: string;
  repositoryName: string;
};

export class Infrastructure extends TerraformStack {
  constructor(scope: Construct, id: string, private opts: InfrastructureOpts) {
    super(scope, id);

    console.log('opts', this.opts);

    new AwsProvider(this, 'aws');

    // const serverlessStage = new ServerlessApiStage(this, 'serverless_stage', {
    //   repositoryName: opts.repositoryName,
    //   stage: opts.stage,
    // });

    // if (opts.api) {
    //   const { api } = opts;

    //   const apiFunction = new LambdaFunction(this, 'serverless_api_function', {
    //     functionName: `${opts.repositoryName}-${opts.stage}-${api.apiPath}`,
    //     role: serverlessStage.roleArnOutput,
    //     publish: true,
    //     runtime: api.runtime,
    //     handler: api.handler,
    //     filename: api.filename,
    //   });

    //   new ServerlessApiGatewayDeploy(this, 'serverless_api_deploy', {
    //     apiId: serverlessStage.apiIdOutput,
    //     apiPath: api.apiPath,
    //     rootResourceId: serverlessStage.rootResourceIdOutput,
    //     functionName: apiFunction.functionName,
    //     functionVersion: apiFunction.version,
    //   });

    //   // TODO Output to .well-known
    // }

    // if (opts.web) {
    //   // const { web } = opts;
    //   // const s3Bucket =
    //   new S3Bucket(this, "web_stage", {
    //     bucketPrefix: `${opts.stage}-${opts.repositoryName}-public`,
    //     acl: "public-read",
    //     website: { indexDocument: "index.html", errorDocument: "index.html" },
    //   });

    //   // new S3Sync(this, 'web_deploy', {
    //   //   bucketName: s3Bucket.bucket,
    //   //   distDir: web.distPath,
    //   // });
    // }
  }
}

// TODO: State storage
