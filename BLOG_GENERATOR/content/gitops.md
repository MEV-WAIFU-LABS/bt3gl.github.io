Title: So, What is GitOps?
Date: 2017-09-22 9:00 
Category: infra
Tags: k8s, scalability, gitops, flux

![cyberpunk](./cyberpunk/container.png){:height="270px" width="390px"}


In general, there are two ways to deploy infrastructure changes:

- **Procedural way**: telling some tool what to do, e.g.: [Ansible](https://www.ansible.com/) (a glorified SSH). This is also known as a *push model*.
- **Declarative way**: telling some tool what you want to have done, also known as *infrastructure as code*, e.g.: [Terraform](https://www.terraform.io/) and [Pulumi](https://www.pulumi.com/).

**GitOps** is a term created by [WeWorks](https://www.weave.works/technologies/gitops/) and works by using Git as a source of truth for *declarative* infrastructure and applications. Automated CI/CD pipelines roll out changes to your infrastructure after commits are pushed and approved in Git. This model is becoming a popular operating way for building applications on Kubernetes. 

![cyberpunk](./cyberpunk/gitiops1.png){:height="270px" width="390px"}


In GitOps you only push code. The developer interacts with the source control, which triggers the CI/CD tool (e.g. [Jenkins](https://jenkins.io/) or [CicleCI](https://circleci.com)), and this pushes the docker image to the container register (e.g. [docker hub](https://hub.docker.com/)). So you can see the Docker image as an artifact! 

To deploy that Docker image, you have a different **config repository** which contains the k8s manifests. The CI/CD tool sends a pull request, and when it is merged, a **magic pod** in the k8s cluster pulls the image to the cluster (similar to `kubectl apply`, the popular [k8s management tool](https://kubernetes.io/docs/reference/kubectl/kubectl/), or even `helm update`, another popular [k8s production tool](https://helm.sh/)). 

Everything is controlled through pull requests. You push code, not containers. 

Wait, but what is this **magic pod**? Glad you ask: the magic is performed by a tool called [Flux](https://github.com/fluxcd/flux), which automatically ensures that the state of a cluster matches the config in Git. It uses an operator in the cluster to trigger deployments inside Kubernetes, which means you don't need a separate CI/CD tool. It monitors all relevant image repositories, detects new images, triggers deployments, and updates the desired running configuration based on that.


So, ultimately, the key advantages of GitOps models are: increased productivity and stabilities, higher reliability, and standardization. But mostly, no more manual `kubectl` commands anymore!

