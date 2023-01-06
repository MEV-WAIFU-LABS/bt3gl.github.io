Title: iPython Notebook server with Amazon Web Services (EC2) 
Date: 2015-08-22 9:00 
Category: tips
Tags: aws, notebooks

![cyberpunk](./cyberpunk/container.png){:height="270px" width="390px"}

# AWS Console and EC2 Instance Launch.

- Log in at the [AWS Console](http://aws.amazon.com/console/).
- We're going to use the _Classic Wizard_ for the Instance Creation.
- The free tier is only eligible for the *T1 Micro*.  You can use all the defaults.
- The Wizard is going to ask you to create a public key (or use an existing one if this isn't your first time). 
- The *Security Group* step is a crucial step. This step can only be configured when you launch the instance! Under the Create New Security Group:

# Setting Security Groups

- You should have  these rules:

```
   * SSH(22): 0.0.0.0/0, 

   * HTTPS(443): 0.0.0.0/0, 

   * 8888: 0.0.0.0/0. 
```

Where 0.0.0.0/0 means access from *ANY* outside I.P. address. We will use port 8888 for our iPython Notebook server. 

- Launch and SSH to the Instance!


# Setting up your Python Environment

Set up your python environment with [Anaconda](http://continuum.io/downloads.html). Use `wget` to download the Anaconda installer to your server:

```
$ wget http://09c8d0b2229f813c1b93-c95ac804525aac4b6dba79b00b39d1d3.r79.cf1.rackcdn.com/Anaconda-2.0.0-Linux-x86_64.sh
```

(or get from here: http://continuum.io/downloads)

- make the bash script executable:

```
$ chmod a+x anaconda_script_.sh
```

- Run the Bash script. 

```
$ ./anaconda_script_.sh
```

- Anaconda will install everything in a folder in your home directory.


- After a few minutes, the install will finish and will ask you to put the folder that was just created at the top of your $PATH. Make sure to reload your .bashrc:

```
$ source ~/.bashrc
```

- You can double-check which Python you are using by calling: 

```
$ which python
```


# Setting up iPython Notebook

- From anywhere type:

```
$ ipython profile create nbserver
```

- Next, we're going to create a password for your notebook server. I'm going to do everything from within iPython right now. You can access the shell commands by prepending your commands with "!". Some commands like "cd" and "ls" don't need an "!" in front. It's pretty awesome. See "Magic Functions" in the resources section.

- The output of passwd() is going to be used in the notebook configuration file later. So save/remember it!


- Up next we're going to create a directory in our home folder called "certificates". In this folder we're going to save a self-signed SSL certificate:


- We're going to need the name of the certificate and the absolute path for the notebook configuration file.


- Last, but not least, it's time to modify our ipython_notebook_config.py file.

- Cruise over to ~/.ipython/profile_nbserver/ and open up the ipython_notebook_config.py file.


- Uncomment each of them, one by one and save.


# Launching you iPython Notebook
-  From anywhere run the following: 

```
$ ipython notebook --profile=nbserver
```


- If you're successful, you should have an output like the above! 


## Logging in to your Notebook from the Browser
- To log in via the browser, we need the Public DNS for our sever. Cruise over to your AWS Console and select your instance from the Instances page. Under description you should find this:


- Using your public DNS go to your fav browser and type:
   https://your-Instance's-public-DNS:8888
Do not forget the https!

- If successful you'll get a warning about the self-signed certificate. It's ok! Click **Continue**.


- You're in! Enter your password, create a notebook, and start doing... stuff!



## Set up IPython Notebook to start automatically

- So that you don't have to log in to SSH to get IPython Notebook running, you can set up to start it for you.

- Find the path of ipython:

```
$ which ipython
```

- Add this line to the file: /etc/rc.local:

```
<where>ipython notebook --profile nbserver --pylab inline

```
- Now you should be able to reboot, and you should be able to access your IPython Notebook as before. Type reboot into the command-line. 
This will boot you out of SSH, but you should be able to reconnect in a few minutes. After the server has had time to reboot, 
you should see if you can access your IPython Notebook server.


# Final Notes

- Remember to always check the SSL signature before typing your password in. If you don't, then it is possible that there is a (wo)man-in-the-Middle attack going on.

- Associate an [Elastic IP](http://aws.amazon.com/articles/1346) to your instance. Now you've got a static IP no matter what kind of instance you start. Use your Elastic IP and set up forwarding from a domain that you own. Instead of having a random IP address, you can access your notebook via a memorable domain name. 

