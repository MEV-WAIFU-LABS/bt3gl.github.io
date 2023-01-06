Title: Getting your Public IP from the Terminal
Date: 2014-06-21 2:00
Category: Networking
Tags: Linux IP

Public IPv4 addresses are assigned by [NIC](https://en.wikipedia.org/?title=InterNIC) and belong to [CIDR blocks](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) that are unique to the entire internet. 

In this little post, I show many ways to find your public IP address form the Linux terminal. 

### Using Curl

You can curl it from IP websites:


```bash
$ curl ifconfig.me
```

You might want to get more details (such as remote_host) with:

```bash
$ curl ifconfig.me/all
```

Other destination that also works: ipinfo.io/ip. Curling ipinfo.io is also great to get information about the Geographical Location of a provided IP address.

### Using wget

Similarly to curl:

```bash
$ wget http://observebox.com/ip -O - -q ; echo
```

### Using dig and host

Another nice way to find the IP:

```bash
$ host -t a dartsclink.com | sed 's/.*has address //'
dig +short myip.opendns.com @resolver1.opendns.com
```

### If you use DynDNS

Finally, if you have a [DynDNS](http://dyn.com/dns/) configuration:

```bash
$ curl -s http://checkip.dyndns.org/ | grep -o "[[:digit:].]\+"
```

:)

