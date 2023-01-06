Title: 8 Reasons why Go is Awesome
Date: 2015-01-12 6:00 
Category: software
Tags: golang, algorithms, awesome

![cyberpunk](./cyberpunk/w1.jpg){:height="270px" width="390px"}


Go is a programming language developed by Google, introduced to the public in 2009. Go's developers had the goal of creating a language based on the syntax of the C programming language, elimination some "garbage" of older languages (such as C++) while containing many features of modern languages.


###1 It Compiles Into a Single Binary

Golang builds as a compiled language and, using static linking; it combines all dependency libraries and modules into one single binary file based on OS type and architecture. Which means that if you are compiling your backend application on your laptop with Linux X86 CPU, you can just upload the compiled binary into your server and it will work, without installing any dependencies.

###2 Static Type System

A type system is essential for large scale applications. Python sometimes will give you unusual exceptions (e.g., you are trying to use a variable as an integer, but it turns out that it’s a string). Go will tell you to write alway that it won't work.

###3 Pointers

Aiming to provide a modern equivalent of C, Go has brought back pointers. Most modern languages do not provide pointers, but sometimes pointers help to solve a lot of common issues: they can play a far important role when it comes to memory layout and building low-level system tools.


For example, you can pass your **data struct** along with functions in a very clean way:

```go
type Route struct {
 service string
 url string
}


func AddRoute(routes map[uint8]*UDP_Route, requestPacket uint8, service string, url string) {
 routes[requestPacket] = &UDP_Route{service: service, url: url}
}


func InitializeRoutes() map[uint8]*UDP_Route {
 routes := make(map[uint8]*UDP_Route)
 AddRoute(routes, service, url)
 return routes
}


func UDP_Handler(routes map[uint8]*UDP_Route, ...) { 
 var route *UDP_Route = routes[packetType]
```

###4 Performance and Goroutines

Most of the modern programming languages (like Java, Python, etc.) are from the ’90s single-threaded environment. Go, on another hand, offers some great concurrency primitives and makes it extremely easy to implement a concurrent system. Goroutines are cheap, lightweight threads of execution. Spawning a goroutine is as simple as adding the `go` keyword before a function.

```go
func GorotineExample() {
 time.Sleep(10)
 go fmt.Println("go routine ftw")
```

Go tends to perform better because of this concurrency model and CPU scalability. Whenever you need to process some internal request, you just use a Goroutine, which is much cheaper in resources than Python's threads, saving lots of resources (Memory, CPU) because of the built-in language features.

In addition, goroutines have growable segmented stacks (use more memory only when needed), a faster startup time than threads, come with built-in primitives to communicate safely between themselves (by using `channel`: kind of pipe to specify goroutine where to send the output), allow you to avoid having to resort to mutex locking when sharing data structures, and can run on multiple threads.

Finally, Go has the `defer` statement, which ensures that a function call is performed later in a program’s execution (for instance, for cleanup). The deferred call's arguments are evaluated right way, but the function call is not executed until the function returns. 


###5 You Don’t Need a Web Framework

Go has `http`, `json`, `html` templating built-in language natively and you can build very complex API services very quickly.

For instance, you can spin up a webpage this easy (check it out yourself!):

```go
package main

import (
 "flag"
 "html/template"
 "log"
 "net/http"
)

var addr = flag.String("addr", ":1718", "http service address") // Q=17, R=18

var templ = template.Must(template.New("qr").Parse(templateStr))

func main() {
 flag.Parse()
 http.Handle("/", http.HandlerFunc(QR))
 err := http.ListenAndServe(*addr, nil)
 if err != nil {
 log.Fatal("ListenAndServe:", err)
 }
}

func QR(w http.ResponseWriter, req *http.Request) {
 templ.Execute(w, req.FormValue("s"))
}

const templateStr = `
<html>
<head>
<title>QR Link Generator</title>
</head>
<body>
{{if .}}
<img src="http://chart.apis.google.com/chart?chs=300x300&cht=qr&choe=UTF-8&chl={{.}}" />
<br>
{{.}}
<br>
<br>
{{end}}
<form action="/" name=f method="GET"><input maxLength=1024 size=70
name=s value="" title="Text to QR Encode"><input type=submit
value="Show QR" name=qr>
</form>
</body>
</html>'
```

###6 Your Django framework would not crash

Go heavily relies on static code analysis. Examples include [godoc](https://golang.org/doc/) for documentation, [gofmt](https://golang.org/cmd/gofmt/) for code formatting, [golint](https://github.com/golang/lint) for code style linting, and many others.

Those tools are commonly implemented as stand-alone command-line applications and integrate easily with any coding environment.

###7 Workspaces are Simple 

Golang code must be kept inside a workspace: a directory hierarchy with three directories at its root:
* `src` contains go source files organized into packages,
* `pkg` contains package objects,
* `bin` contains executable commands.

The `GOPATH` environment variable determines the location of the workspace. It is the only environment variable that you have to set when developing Go code.

###8 Fun Factor

Go is a relatively simple language and was designed with a very minimalistic approach: quick to learn and easy to write!
Plus several cool stuff has been written in Go, such as [Docker](https://www.docker.com), [Kubernetes](https://kubernetes.io/), and [Terraform](https://www.terraform.io/).

----

## Some Resources I Loved

* Start with the [official documentation](https://golang.org/).
* Take a look at [Go by Example](https://gobyexample.com/).
* Take a [tour through Go](https://tour.golang.org/welcome/1).
* Subscribe to [Go weekly](https://golangweekly.com/).
* Check [Reddit's channel](https://www.reddit.com/r/golang).
* Watch some [JustForFunc videos](https://www.youtube.com/channel/UC_BzFbxG2za3bp5NRRRXJSw).
* [Understanding Data Types in Go](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-go).
* [Tensorflow in Go](https://medium.com/@hackintoshrao/deep-learning-in-go-f13e586f7d8a).
* [Jessie Frazelle on Internals of the Go Linker](https://www.reddit.com/r/golang/comments/c2rgrf/gothamgo_2017_internals_of_the_go_linker_by/).
