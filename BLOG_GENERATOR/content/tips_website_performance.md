Title: 18 Tips for Website Performance
Date: 2016-12-12
Category: web, dev

![cyberpunk](./cyberpunk/16.jpg){:height="300px" width="400px"}


## 1. Test your Website’s Speed

Use a website speed test tool to analyze the overall speed of your website. For instance, [KeyCDN’s website speed test tool](https://tools.keycdn.com/speed) or [WebPageTest](http://www.webpagetest.org/) can useful (and they both support HTTP/2). You could also use a [JavaScript](https://www.ej-technologies.com/products/jprofiler/overview.html) profiler.


## 2. Load Test Your Site
Load test your website to check for any bottlenecks. Some cool tools for this task:

* [Blirz](https://www.blitz.io/)
* [Wonder Network](https://wondernetwork.com/loadtesting)
* [Load Impact](https://loadimpact.com/)
* [Loader](https://loader.io/)


## 3. Use Performance Tools


You can check how fast in seconds you want your site to load, on certain connection speed, with this [free Budget Calculator tool](http://www.performancebudget.io/), depending on the number of resources (HTML, images, JS, CSS, fonts, etc.).

Additionally, check [Google's performance resources](https://developers.google.com/speed/).



## 4. Reduce the number of HTTP Requests

* If your JS code is small enough, you can have it inline.
* Reduce the number of third-party plugins and frameworks.
* Have less code.


## 5. Clean up your JS and CSS

* Remove unnecessary characters (whitespace, new line, comments).
* Some useful tools are [grunt ugligy](https://www.npmjs.com/package/gulp-uglify) and [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css).

## 6. Avoid Redirects

301 redirects will damage the performance of your website because they generate additional round trip times (RTT) before the browser even starts to load other assets.


## 7. Image Optimization

* Use compression tools such as [image_optim](https://github.com/toy/image_optim), [tinypgn](https://tinypng.com/), [pngmini](https://pngmini.com/), [jpegmini](https://www.jpegmini.com).
* Use responsive images in HTML with ***srcset*** and sizes attributes to serve different scaled images, based on the size of the display.


## 8. Render Blocking Resources blocking the DOM

The ***Document Object Model*** is a programming interface for HTML and XML documents that provide a structured representation (node tree) of a document, defining ways it can be accessed and manipulated using scripting languages such as Javascript. To ensure that the DOM loads in a responsive time, render-blocking resources should get to the client as soon and as quickly as possible.

Here some tips for DOM resources:

* CSS
 * Use [media queries](https://developers.google.com/web/fundamentals/performance/critical-rendering-path).
 * Concatenate all CSS files in one.
 * Remove extra spaces, characters, comments, etc.
 * Check [Autoprefixer ](https://github.com/postcss/autoprefixer).

* JavaScript
 * The ***async*** tag allows the script to be downloaded in the background without blocking.
 * Move JS scripts to the bottom of the page, right before the </body> tag.
 * Concatenate all JS files in one.
 * Remove extra spaces, characters, comments, etc.


## 9. Reduce Latency with a CDN.

You can test the latency of your website by using sending out ICMP packets to its address (by ping in your terminal or [UI tools](https://tools.keycdn.com/ping)).

Content Delivery Networks are servers that maintain cached copies of the content of a website (images, CSS, JS, fonts), so that they can be retrieved from the closest physical location for reduced latency. Here some nice guides for [google cloud storage](https://www.keycdn.com/support/google-cloud-storage-cdn-integration/) and [AWS S3](https://www.keycdn.com/support/aws-s3-cdn-integration/).


## 10. Time to first byte (TTFB)

TTFB is the measurement of the responsiveness of a web server, as the time that takes for the browser to start receiving information after it has requested it from the server.

TTFB is calculated as **HTTP request time + Process request time + HTTP response time**, and can be check at the [Chrome Dev Tools](https://developers.google.com/web/tools/chrome-devtools/) (the green bar).


## 11. Browser Cache

Let the browser cache some data (with a max-age of a week) by using HTTP headers such as ***Cache-control*** and ***Expires***.


## 12. Prefetching

DNS prefetching can be a good solution to resolve domain names before a user follows a link. It's implemented in the ***HEADER*** session with:

```
<link rel="dns-prefetch" href="//www.example.com">
```

## 13. Preconnecting

With the ***preconnect*** label, the browser can set up early connections (such as DNS lookup, TLS negotiation, etc.) before an HTTP request is sent to the server. This can be implemented with:

```
<link href='https://CDNHOST.com' rel='preconnect' crossorigin>
```

## 14. HTTP/2

HTTP/2 comes with a huge performance benefit. To enable HTTP/2, one needs an SSL certificate and a server that supports HTTP/2.

## 15. Hotlink Protection

Hotlink protection is given by restricting HTTP referrers so that one can prevent others from embedding assets on other websites (protecting site's bandwidth). To use it, one needs to place the code below in a `.htaccess` file (Apache):

```
RewriteEngine On
RewriteCond %{HTTP_REFERER} !^http://(.+\.)?domain\.com/ [NC]
RewriteCond %{HTTP_REFERER} !^$
RewriteRule .*\.(jpe?g|gif|bmp|png)$ http://i.imgur.com/DONT_DISPLAY.gif [L]
```

## 16. Enable Gzip Compression

Gzip compresses web pages, CSS, and JS code at the server level, before sending them over to the browser, to optimize the website performance. This is enabled in the `.htaccess` file (Apache) or `nginx.conf` (Nginx).



## 17. Optimizing Video


Matching the file type to the optimal platform reduces playback issues:

* `.mp4` is a good quality video with a small file size and is the recommended format for YouTube and Vimeo.

* `.mov` is a high-quality video with a large file size. This file type doesn't play on windows without the help of VLC.

* `.wmv` is a good quality video with a large file size. It is also hard to play this format on Mac machines unless you have VLC.

* `.flv` is a small file size, but need extra steps to bring up the quality. This format doesn’t play natively on most Mac and Windows machines.

There are plenty of programs that will reformat videos, rearranging file settings for faster playback, which helps them stream more smoothly across a multitude of devices. For instance, [Handbrake](https://handbrake.fr/), is a useful open-source video transcoder.


## 18. Automate

Have a [Continuous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery) pipeline, which includes profiling and performance analysis of acceptance and load tests.

