Title: tmux shortcuts & cheatsheet
Date: 2015-11-02 7:00 
Category: software
Tags: tmux, tools

![cyberpunk](./cyberpunk/tmux.jpg){:height="270px" width="390px"}

If you are not using [tmux](https://github.com/tmux/tmux) yet, you are missing it out!

Here some shortcuts and configs to help you to start.

## Starting Sessions

start new:

```
tmux
```

start new with session name:

```
tmux new -s myname
```

attach

```
    tmux a  #  (or at, or attach)
```


attach to named

```
tmux a -t myname
```

ssh attach
```
ssh -A remote_machine -tt agenttmux atach
```

list sessions

```
tmux ls
```

## Killing sessions

```
tmux kill-session -t myname
```

kill all the tmux sessions

```
tmux ls | grep : | cut -d. -f1 | awk '{print substr($1, 0, length($1)-1)}' | xargs kill
```

In tmux, hit the prefix `ctrl+b` (my modified prefix is ctrl+a) and then:

##  Inside Sessions

```
    :new<CR>  new session
    s  list sessions
    $  name session
```

## Windows (tabs)

```
    c  new window
    w  list windows
    f  find window
    ,  name window
    &  kill window
```

## Panes (splits) 

Configs from my [tmux.conf](https://github.com/bt3gl/Shell-Scripts_and_Dotfiles/blob/master/configs/tmux.conf):

    -  vertical split
    |  horizontal split
    
    o  swap panes
    q  show pane numbers
    x  kill pane
    +  break pane into window (e.g. to select text by mouse to copy)
    -  restore pane from window
    ⍽  space - toggle between layouts
    <prefix> q (Show pane numbers, when the numbers show up type the key to goto that pane)
    <prefix> { (Move the current pane left)
    <prefix> } (Move the current pane right)
    <prefix> z toggle pane zoom

## Sync Panes 

You can do this by switching to the appropriate window, typing your Tmux prefix (commonly Ctrl-B or Ctrl-A) and then a colon to bring up a Tmux command line, and typing:

```
:setw synchronize-panes
```

You can optionally add on or off to specify which state you want; otherwise, the option is simply toggled. 
This option is specific to one window, so it won’t change the way your other sessions or windows operate.
 When you’re done, toggle it off again by repeating the command.


## Resizing Panes

You can also resize panes if you don’t like the layout defaults. I personally rarely need to do this. Here is the basic syntax to resize panes:

```
    PREFIX : resize-pane (By default it resizes the current pane down)
    PREFIX : resize-pane -U (Resizes the current pane upward)
    PREFIX : resize-pane -L (Resizes the current pane left)
    PREFIX : resize-pane -R (Resizes the current pane right)
    PREFIX : resize-pane 20 (Resizes the current pane down by 20 cells)
    PREFIX : resize-pane -U 20 (Resizes the current pane upward by 20 cells)
    PREFIX : resize-pane -L 20 (Resizes the current pane left by 20 cells)
    PREFIX : resize-pane -R 20 (Resizes the current pane right by 20 cells)
    PREFIX : resize-pane -t 2 20 (Resizes the pane with the id of 2 down by 20 cells)
    PREFIX : resize-pane -t -L 20 (Resizes the pane with the id of 2 left by 20 cells)
```


## Misc

```
    d  detach
    t  big clock
    ?  list shortcuts
    :  prompt
```

## Config Options

```
    # Mouse support - set to on if you want to use the mouse
    * setw -g mode-mouse off
    * set -g mouse-select-pane off
    * set -g mouse-resize-pane off
    * set -g mouse-select-window off

    # Set the default terminal mode to 256color mode
    set -g default-terminal "screen-256color"

    # enable activity alerts
    setw -g monitor-activity on
    set -g visual-activity on

    # Center the window list
    set -g status-justify centre

    # Maximize and restore a pane
    unbind Up bind Up new-window -d -n tmp \; swap-pane -s tmp.1 \; select-window -t tmp
    unbind Down
    bind Down last-window \; swap-pane -s tmp.1 \; kill-window -t tmp
```

----

## Resources:

* [tmux: Productive Mouse-Free Development](http://pragprog.com/book/bhtmux/tmux)
* [How to reorder windows](http://superuser.com/questions/343572/tmux-how-do-i-reorder-my-windows)

