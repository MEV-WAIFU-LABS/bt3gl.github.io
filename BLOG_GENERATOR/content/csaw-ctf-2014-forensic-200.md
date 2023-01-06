Title: CSAW CTF 2014 - Forensics 200: "why not sftp?"
Date: 2014-09-22 5:20
Category: Forensics
Tags: CTF, CSAW, Wireshark, FTP



The purpose of this problem is to teach about the need for encrypting your data. The [FTP]  protocol sends clear text over the wire, *i.e* the data is transmitted without any encryption.
 [SSH/Secure File Transfer Protocol] is a network protocol providing secure file transfer. Using SFTP, instead of FTP, would avoid finding the flag in this problem in the way we did.

This is the second forensics problem and it starts with the following text:

> well seriously, why not?
>
> Written by marc
>
> [traffic-5.pcap]
>



---

## Analyzing the PCAP File

Now let's search for the flag! We open the [pcap] file in [Wireshark] (an open-source packet analyzer). There are several things that we could search for in this file, for instance, we could look for FTP transactions or we could search for strings such as *password* or *flag*. We show both approaches.


## Solution 1: Searching for the string *flag*

#### Going in the Wrong Way

So the first thing I did was searching for the string *password*:

1. Go to Edit
2. Go to Find Packet
3. Search for password choosing the options string and packet bytes.

Clicking on *Follow TCP Stream* gives:
![cyber](http://i.imgur.com/c61P5Aj.png)

Nope. This is misleading information!

---

#### But We Were Almost There!

Now, if we search for *flag* we actually find something:

![cyber](http://i.imgur.com/knuwJFq.png)

We find the packet with a file named flag! Awesome.


---

## Solution 2: Looking for the FTP Protocols

All right, let's use another information we have: it should be something related to the FTP protocol. In Wireshark, we can find specific protocol with filters. We want to filter for FTP with some data. We start trying the usual FTP-DATA port:

```
tcp.port==21
```

Nope. The results should be another port. Let's search explicitly for:

```
ftp-data
```

Cool, we found a few packets:
![cyber](http://i.imgur.com/cWhiXZD.png)

 We don't need to scroll down too much to find a packet with a string flag on it! Awesome.


---

## Extracting the File

Once we find the packet with any of the methods above, we right-click it selecting *Follow TCP Stream*. This leads to:

![cyber](http://i.imgur.com/LZTse2s.png)

The file *flag.png* is our flag. To extract it we  click in the *Save as* button, then in the terminal, we can use the command [file]:
```sh
$ file s.whatever
s.whatever: Zip archive data, at least v2.0 to extract
```

Awesome, so all we need is to *unzip* this file and we get *flag.png*:

![cyber](http://i.imgur.com/WcxyITv.png)

#### Extra: Finding files with *File Signatures*
If we don't know the name of the file we are looking for, but we know its type, we can search for its [file signature], which can be found [here] (a hex value).


**Hack all the Things!**
[file signature]: http://en.wikipedia.org/wiki/File_signature
[here]: http://en.wikipedia.org/wiki/List_of_file_signatures
[file]: http://en.wikipedia.org/wiki/File_(command)
[SSH/Secure File Transfer Protocol]: http://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol
[traffic-5.pcap]: https://ctf.isis.poly.edu/static/uploads/7831788f2ab94feddc72ce53e80fda5f/traffic-5.pcap
[sftp]: http://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol
[pcap]: http://en.wikipedia.org/wiki/Pcap
[Wireshark]: https://www.wireshark.org/
[FTP]: http://en.wikipedia.org/wiki/File_Transfer_Protocol

