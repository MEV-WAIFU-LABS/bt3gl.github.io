Title: Setting up a PostgreSQL RDS instance using CDK in Python
Date: 2018-08-11 9:00 
Category: cdk

![cyberpunk](./cyberpunk/1339.jpg){:height="270px" width="390px"}

In [a previous post](https://marinasteinkirch.com/setting-up-a-vpc-with-cdk-in-python.html), I advocated that [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html) is a very neat way to write infrastructure as code, enabling you to create and provision AWS infrastructure deployments predictably and repeatedly.

Today I show how to spin up a PostgreSQL RDS instance using CDK in Python. The code is available [here](https://github.com/bt3gl/AWS_Resources/tree/master/CDK_examples).

### Install AWS CDK

Follow [theses instructions](https://github.com/aws/aws-cdk#at-a-glance).


### Create a virtual environment and install dependencies:

```
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Define You RDS DB 

Add any constant variable in `cdk.json` and then define how you want your RDS instance in `postgre_sql_example/postgre_sql_example_stack.py`:

```
class PostgreSqlExampleStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # Database Instance
        instance = rds.DatabaseInstance(self,
            'examplepostgresdbinstance', 
            master_username=master_username,
            engine=rds.DatabaseInstanceEngine.POSTGRES, instance_class=ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO), 
            vpc=self.vpc,
            auto_minor_version_upgrade=auto_minor_version_upgrade,
            availability_zone=availability_zone,
            database_name=database_name,
            enable_performance_insights=enable_performance_insights,
            storage_encrypted=storage_encrypted,
            multi_az=multi_az,
            backup_retention=backup_retention,
            monitoring_interval=monitoring_interval,
         )
```

### Create synthesized CloudFormation templates

```
cdk synth
```

You can check what changes are introduced into your current AWS resources with:
```
cdk diff --profile <AWS PROFILE>
```


### Deploy to AWS

If everything looks OK, deploy with:

```
cdk deploy --profile <AWS PROFILE>
```

To check all the stacks in the app:

```
cdk ls
```

### Clean up

To destroy/remove all the newly created resources, run:

```
cdk destroy --profile <AWS PROFILE>
```
