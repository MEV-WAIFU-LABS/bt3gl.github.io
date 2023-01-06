Title: Skaffold is a Kool K8s Tool!
Date: 2018-01-09 5:00 
Category: software
Tags: docker, microservices, skaffold

![cyberpunk](./cyberpunk/w2.jpeg){:height="270px" width="390px"}

I recently found out about [Skaffold](https://skaffold.dev/), a command-line tool [recently released by Google](https://www.infoq.com/news/2018/03/skaffold-kubernetes), and designed to make local Kubernetes development very easy, allowing for iterative local development against a Kubernetes cluster. It's really cool, check this out:

* It runs as a binary in your local machine (e.g., [easy install with brew](https://formulae.brew.sh/formula/skaffold), etc.).
* It uses `yaml` configuration to describe how your application should be built: you specify the Docker images for your service(s) and Skaffold will tag them and push them to any valid Docker image repository.
  
```
apiVersion: skaffold/v1beta9
kind: Config
build:
  artifacts:
  - image: gcr.io/k8s-skaffold/skaffold-example
deploy:
  kubectl:
    manifests:
      - k8s-*
```

* These images are ingested into your Kubernetes manifest and used to deploy changes to the clusters for every code change.
* Skaffold **watches your local development directory for filesystem changes** and automatically builds and deploy your application to any local or remote Kubernetes cluster.
* It is integrated to `kubectl` and [GCP](https://cloud.google.com/gcp).
* Skaffold not only works on your laptop as a dev tool, it also lets you reuse the same `skaffold.yaml` file to do deployments to your clusters in your continuous deployment system.

In resume, Skaffold makes development very easy: all you need to do is run `skaffold dev` (local dev workflow: [Minikube](https://kubernetes.io/docs/setup/minikube/), etc.) or `skaffold run` (continuous dev workflow: [Jenkins](https://jenkins.io/), [Travis CI](https://travis-ci.org/), etc.) to start the entire process, creating Kubernetes pod(s) in a cluster with the Docker images of your application.

In this single command, Skaffold:

1. builds container images (locally or remotely),
2. pushes container images if the target is not local cluster,
3. updates Kubernetes manifests with image tags,
4. deploys your application with `kubectl apply`,
5. streams logs from the pods,
6. watches for changes in the source code and Kubernetes manifests, and then repeat 1-5.


------

### Some learning references

* [Official documentation](https://skaffold.dev/).
* [Skaffold & GCP documentation](https://cloud.google.com/blog/products/gcp/introducing-skaffold-easy-and-repeatable-kubernetes-development?hl=is).
* [Github repository with examples](https://github.com/GoogleContainerTools/skaffold).
* [Skaffold Yaml References](https://skaffold.dev/docs/references/yaml/).
* [Skaffold examples](https://github.com/GoogleContainerTools/skaffold/tree/master/examples).
* [Skaffold: From code on your laptop to cloud](https://github.com/ahmetb/skaffold-from-laptop-to-cloud).
* [Skaffold: happy Kubernetes workflows](https://ahmet.im/blog/skaffold/).
* [How to write great container images](https://blog.bejarano.io/how-to-write-great-container-images.html).

