Title: Introducing a GCP Pub/Sub Message Framework
Date: 2016-11-16
Category: gcp, dev, kafka, cloud, k8s

![cyberpunk](./cyberpunk/21.jpg){:height="300px" width="400px"}


To try to make sense of all the logs from different sources on [GCP pub/sub](https://cloud.google.com/pubsub/docs/overview), I created this little [serverless framework](https://github.com/mvonsteinkirch/GCP-Pub-Sub-Message-Framework) that uses [Kafka streams](https://kafka.apache.org/intro) for alerting correlation on [Kubernetes](https://kubernetes.io/).


## Installing Kubeless

Follow [these instructions](https://github.com/kubeless/kubeless). Customize Kubeless config file at `kubeless-config.yaml` and then run:

```
$ make kl
```

## Creating Kubeless topic

In Kafka, messages are published into topics. The functions ran by kubeless (consumers) are going to receive these messages by creating the topic:

```
$ kubeless topic create reactor
```

## Firing Up Containers

To run a logstash, elastsearch, zookeeper and kafka (producers) so that it outputs to Kafka's topic for kubeless, run:

```
$ make pipeline
```

## Debugging

To debug any pods (`kubeless` or `kafka` or `zoo`), grab the name with:

```
$ make pods
```

and then run:

```
$ kubectl logs <podname> --namespace=kubeless
```

-----

# References

* [Kubeless github repository.](https://github.com/kubeless/kubeless)
* [Kubernetes CustomResourceDefiniton.](https://kubernetes.io/docs/tasks/access-kubernetes-api/extend-api-custom-resource-definitions/)
* [Kubeless serveless documentation.](https://serverless.com/framework/docs/providers/kubeless/)
* [Kafka Concepts and Common Patterns](https://www.beyondthelines.net/computing/kafka-patterns/).



-------

***Enjoy and let me know what you think! :)***


PS: If you want to learn more about GCP, check my resources and labs [here](https://github.com/mvonsteinkirch/GCP_Studies_and_Labs).

