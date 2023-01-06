Title: Functional Python Stuff Super Quick
Date: 2015-03-1
Category: DevOps


### Python has **First Class Functions**

```
def create_adder(x):
    def adder(y):
        return x + y
    return adder
```

Such that:
```
>>> add_10 = create_adder(10)
>>> add_10(3)  
13
```

### Python has **Anonymous Functions**

```
(lambda x: x > 2)(3)   # => True
```


### Python has Built-in **Higher Order Functions**

```
map(add_10, [1, 2, 3])   # => [11, 12, 13]
filter(lambda x: x > 5, [3, 4, 5, 6, 7])   # => [6, 7]
```
