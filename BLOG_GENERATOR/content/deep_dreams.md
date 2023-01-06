Title: The effects of Convolutional Neural Networks on a Hot Summer Night
Date: 2016-08-01
Category: AI & ML

![dream](./dream/d1.jpg){:height="300px" width="400px"}

About a year ago, Google published a seminal paper named [ImageNet Classification with Deep Convolutional Neural Networks](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf), together with a [blog post](https://research.googleblog.com/2015/07/deepdream-code-example-for-visualizing.html), which became known as **Inceptionism**. This work unveiled not only a new way of composing hallucinating artistic pictures but astonishing new insights on **how convolutional neural networks work**. Now we are able to see what each hidden layer in the net has learned, or in a more philosophical explanation, what the **machine sees**.

Convolutional Neural Networks take an image (a vector of pixels) as input, and transform the image through several layers of nonlinear functions (kind of how [kernels](https://en.wikipedia.org/wiki/Kernel_(image_processing)) work). The **dream images** are just a **gradient ascent process** that minimizes the **L2 norm** of activation functions of some deep neural network layer. 

More specifically, in the task of image classification, the neurons have the following functions:

* **lower levels** reveal edge-like regions in the images (such as corners, lines),
* **intermediate layers** represent basic shapes and components of objects (such as eyes, boxes),
* **the final layers** compose the complete interpretation (such as a dog), but in a [psychedelic way](https://www.reddit.com/r/deepdream/comments/3cawxb/what_are_deepdream_images_how_do_i_make_my_own/). 


Google released the code of its [GoogLeNet model](https://github.com/BVLC/caffe/tree/master/models/bvlc_googlenet), which is trained trained on [ImageNet dataset](http://www.image-net.org/). I slightly adapted it [here](https://github.com/bt3gl/Machine-Learning-Resources/tree/master/Deep_Art/deepdream), adding some instructions on how one can play with it in an AWS GPU instance.


Examples of **deep dream** with the following layers:

#### *inception_3b/5x5_reduce* (lower levels):
![dream](./dream/d12.jpeg){:height="450px" width="550px"}

#### *inception_4c/output* (higher levels):
![dream](./dream/d11.jpeg){:height="450px" width="550px"}

#### *inception_3b/output* (controlled dreams):
![dream](./dream/d3.jpg){:height="450px" width="550px"}
![dream](./dream/d13.jpeg){:height="450px" width="550px"}


### Enjoy!

![dream](./dream/1.jpg){:height="300px" width="400px"}


