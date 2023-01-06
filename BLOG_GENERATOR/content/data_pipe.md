Title: Thinking about Machine Learning Data Pipelines
Date: 2016-05-17 4:19 
Category: AI & ML
Tags: python, data, airflow, etl, luigi


![cyberpunk](./cyberpunk/data_pip.png){:height="270px" width="390px"}

 Machine learning involves tasks that include data sourcing, data ingestion, data transformation, pre-processing data for use in training, training a model, and hosting the model. Additionally, to get value out of machine learning models, we need an architecture and process in place to repeatedly and consistently train new models and retrain existing models with new data.

For example, for a movie dataset from an external source on the internet:

* If we are in AWS, we could upload it to **S3** and then bring to **Dynamo DB**. The data could be ingested as a one-time full-load as a batch or as a real-time stream.

* There may be a need to do **both batch and stream or just a batch or a stream**. In this case, the data could be **full-loaded of data into Dynamo DB** and then **stream new records into Kinesis stream using the Lambda function** as a source simulator.

* We could create a **schema on the data stored in S3 and DynamoDB and perform ETL** on the data to prepare it for the machine learning process.

* If we have an **AWS S3 data lake** ready, we could use **Amazon Sagemaker for model training and inference**.

As I start a little [github repo for my personal research (dumps...) on Data Pipelines](https://github.com/mvonsteinkirch/Data-Pipelines) (PR your contribution!), in this post, I add my little intro on the topic.


## ETL: Extract, Transform, and Load

These three conceptual steps are how most data pipelines are designed and structured, serving as a blueprint for how raw data is transformed to analysis-ready data:

* **Extract**: sensors wait for upstream data sources.
* **Transform**: business logic is applied (e.g., filtering, grouping, and aggregation to translate raw data into analysis-ready datasets).
* **Load**: processed data is transported to a final destination.

### Airflow

[Apache Airflow](https://github.com/apache/airflow) was a tool [developed by Airbnb in 2014 and later open-sourced](https://medium.com/airbnb-engineering/airflow-a-workflow-management-platform-46318b977fd8). It is a platform to programmatically author, schedule, and monitor workflows. When workflows are defined as code, they become more maintainable, versionable, testable, and collaborative.

You can use Airflow to author workflows as directed acyclic graphs (DAGs) of tasks. The Airflow scheduler executes your tasks on an array of workers while following the specified dependencies. Rich command line utilities make performing complex surgeries on DAGs a snap. The rich user interface makes it easy to visualize pipelines running in production, monitor progress, and troubleshoot issues when needed.

The key concepts are:

* DAG: a directed acyclic graph object that ties together all the tasks in a cohesive workflow and dictates the execution frequency (i.e., schedule).
* task: a unit of work to be executed that should be both atomic and idempotent. In Airflow, there are two types of tasks: Operators and Sensors.
* operator: a specific type of work to be executed.
* sensor: a blocking task that runs until a condition is met or until it times out.
 
Airflow's architecture has the following components:

* job definitions (in source control).
* CLI: to test, run, backfill, describe and clear parts of your DAGs.
* web application: to explore your DAGs definition, their dependencies, progress, metadata, and logs (built-in Flask).
* metadata repository (in MySQL or Postgres): keeps track of task job statuses.
* array of workers: runs jobs task instances in a distributed fashion.
* scheduler: fires up the task instances that are ready.


Here is [a very simple toy example of an Airflow job](https://gist.github.com/robert8138/c6e492d00cd7b7e7626670ba2ed32e6a) that simply prints the date in bash every day after waiting for one second to pass, after the execution date is reached:

```python

from datetime import datetime, timedelta
from airflow.models import DAG # Import the DAG class
from airflow.operators.bash_operator import BashOperator
from airflow.operators.sensors import TimeDeltaSensor

default_args = {
 'owner': 'you',
 'depends_on_past': False,
 'start_date': datetime(2018, 1, 8),
}

dag = DAG(
 dag_id='anatomy_of_a_dag',
 description="This describes my DAG",
 default_args=default_args,
 schedule_interval=timedelta(days=1)) # This is a daily DAG.

# t0 and t1 are examples of tasks created by instantiating operators
t0 = TimeDeltaSensor(
 task_id='wait_a_second',
 delta=timedelta(seconds=1),
 dag=dag)

t1 = BashOperator(
 task_id='print_date_in_bash',
 bash_command='date',
 dag=dag)

t1.set_upstream(t0)
```

### Luigi

[Luigi data pipelining](https://github.com/spotify/luigi) is Spotify's Python module that helps you build complex pipelines of batch jobs. It handles dependency resolution, workflow management, visualization, etc. It also comes with Hadoop support built-in.

The basic units of Luigi are task classes that model an atomic ETL operation, in three parts: a requirements part that includes pointers to other tasks that need to run before this task, the data transformation step, and the output. All tasks can be feed into a final table (e.g., on Redshift) into one file.

Here is [an example of a simple workflow in Luigi](https://towardsdatascience.com/data-pipelines-luigi-airflow-everything-you-need-to-know-18dc741449b7):

```python
import luigi

class WritePipelineTask(luigi.Task):

 def output(self):
 return luigi.LocalTarget("data/output_one.txt")

 def run(self):
 with self.output().open("w") as output_file:
 output_file.write("pipeline")


class AddMyTask(luigi.Task):

 def output(self):
 return luigi.LocalTarget("data/output_two.txt")

 def requires(self):
 return WritePipelineTask()

 def run(self):
 with self.input().open("r") as input_file:
 line = input_file.read()

 with self.output().open("w") as output_file:
 decorated_line = "My "+line
 output_file.write(decorated_line)
```

### Airflow vs. Luigi


| | Airflow | Luigi |
|---------------------------------------|-----------------------|------------------------|
| web dashboard | very nice | minimal |
| Built in scheduler | yes | no |
| Separates output data and task state | yes | no |
| calendar scheduling | yes | no, use cron |
| parallelism | yes, workers | threads per workers |
| finds new deployed tasks | yes | no |
| persists state | yes, to db | sort of |
| sync tasks to workers | yes | no |
| scheduling | yes | no |



## Learning References

* [Data science resources](https://github.com/davidyakobovitch/data_science_resources).
* [Lorte data pipelining](https://github.com/instacart/lore).
* [Incubator Airflow data pipelining](https://github.com/apache/incubator-airflow)
* [Udemy's Airflow for Beginners](https://www.udemy.com/airflow-basic-for-beginners/).
* [Awesome Airflow Resources](https://github.com/jghoman/awesome-apache-airflow).
* [Airflow in Kubernetes](https://github.com/rolanddb/airflow-on-kubernetes).
* [Astronomer: Airflow as a Service](https://github.com/astronomer/astronomer).
* [Data pipeline samples](https://github.com/aws-samples/data-pipeline-samples/tree/master/samples).
* [GCP Dataflow templates](GoogleCloudPlatform/DataflowTemplates).
* [Awesome Scalability: a lot of articles and resources on the subject](https://github.com/binhnguyennus/awesome-scalability).

#### Enterprise Solutions

* [Netflix data pipeline](https://medium.com/netflix-techblog/evolution-of-the-netflix-data-pipeline-da246ca36905).
* [Netlix data videos](https://www.youtube.com/channel/UC00QATOrSH4K2uOljTnnaKw).
* [Yelp data pipeline](https://engineeringblog.yelp.com/2016/07/billions-of-messages-a-day-yelps-real-time-data-pipeline.html).
* [Gusto data pipeline](https://engineering.gusto.com/building-a-data-informed-culture/).
* [500px data pipeline](https://medium.com/@samson_hu/building-analytics-at-500px-92e9a7005c83.)
* [Twitter data pipeline](https://blog.twitter.com/engineering/en_us/topics/insights/2018/ml-workflows.html).
* [Coursera data pipeline](https://medium.com/@zhaojunzhang/building-data-infrastructure-in-coursera-15441ebe18c2).
* [Cloudfare data pipeline](https://blog.cloudflare.com/how-cloudflare-analyzes-1m-dns-queries-per-second/).
* [Pandora data pipeline](https://engineering.pandora.com/apache-airflow-at-pandora-1d7a844d68ee).
* [Heroku data pipeline](https://medium.com/@damesavram/running-airflow-on-heroku-ed1d28f8013d).
* [Zillow data pipeline](https://www.zillow.com/data-science/airflow-at-zillow/).
* [Airbnb data pipeline](https://medium.com/airbnb-engineering/https-medium-com-jonathan-parks-scaling-erf-23fd17c91166).
* [Walmart data pipeline](https://medium.com/walmartlabs/how-we-built-a-data-pipeline-with-lambda-architecture-using-spark-spark-streaming-9d3b4b4555d3).
* [Robinwood data pipeline](https://robinhood.engineering/why-robinhood-uses-airflow-aed13a9a90c8).
* [Lyft data pipeline](https://eng.lyft.com/running-apache-airflow-at-lyft-6e53bb8fccff).
* [Slack data pipeline](https://speakerdeck.com/vananth22/operating-data-pipeline-with-airflow-at-slack).
* [Remind data pipeline](https://medium.com/@RemindEng/beyond-a-redshift-centric-data-model-1e5c2b542442).
* [Wish data pipeline](https://medium.com/wish-engineering/scaling-analytics-at-wish-619eacb97d16).
* [Databrick data pipeline](https://databricks.com/blog/2017/03/31/delivering-personalized-shopping-experience-apache-spark-databricks.html).

#### Courses & Videos

* [Coursera's Big Data Pipeline course](https://www.coursera.org/lecture/big-data-integration-processing/big-data-processing-pipelines-c4Wyd).
* [Industrial Machine Learning Talk](https://www.youtube.com/watch?v=3JYDT8lap5U).


