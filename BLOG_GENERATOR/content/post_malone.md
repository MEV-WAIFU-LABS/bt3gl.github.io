Title: Quick & Dirty iOS ARKit with "Post Malone Balloon"
Date: 2016-12-16
Category: ios, arkit, ar

![cyberpunk](./cyberpunk/post_1.jpg){:height="300px" width="400px"}

*Augmented reality (AR) describes user experiences that add 2D or 3D elements to the live view from a device’s camera in a way that makes those elements appear to inhabit the real world.*


Hi Everyone!


In this post, I show how neat is to write an AR iOS application with [ARKit](https://developer.apple.com/arkit/), a framework that provides you high-level classes for **tracking**, **scene understanding**, and **rendering**. More specifically, ARKit is a session-based framework. This means that everything will happen in a concrete session. Sessions are a way of encapsulating the logic and data contained within a defined period of the applications activity. It relates the virtual objects with the real world by means of the Tracking.

This app runs an ARKit world tracking session with content displayed in a [SpriteKit](https://developer.apple.com/documentation/spriteKit) 2D view. Every session has a scene that will render the virtual objects in the real world, accessed using the iOS device sensors.

But, before everything, I recommend you to watch [WWDC 2017's 'Introducing ARKit: Augmented Reality for iOS'](https://developer.apple.com/videos/play/wwdc2017/602/). It gives a nice overview of ARKit's capabilities.

Ah, btw, the source code for this project is [available for you at github](https://github.com/bt3gl/AR_PostMalone).


## The source code for AR_PostMalone the following structure:

### `Info.plist`

An information property list file is an XML file that contains essential configuration information for a bundled executable. Example of the information you want to add is:

* The name of your app (`<string>PostMaloneBalloon</string>`).
* Camera usage (`<key>NSCameraUsageDescription</key>`).
* Frameworks you need (`<key>UIRequiredDeviceCapabilities</key>` with `<string>armv7</string>` and `<string>arkit</string>`).


### `Assets.xcassets` directory

Where you place assets such as the images used in your App (Post Malone head) and icons. A file `Content.json` is placed inside every directory to describe the assets.

### `Base.lproj` directory

Contains two [story board files](https://www.raywenderlich.com/160521/storyboards-tutorial-ios-11-part-1):

* `LaunchScreen.storyboard`.
* `Main.storyboard`.



### `Scene.swift`

Anchors are 3D points that correspond to real-world features that ARKit detects. Anchors are created in this class, together with the Sprite scene (Scene.sks). The class `Scene` controls how the App is operating within the scenes. Rendering brings tracking and scene understanding together with your content.

For our App, we are:

* Defining the method `touchesBegan`, where we define what happens when we click the scene.
* The sequence of movements is defined by `let sequence = SKAction.sequence([popSound, moveDown, moveDownFloating, moveToBottom])`.
* When you touch the scene, a Post Malone Balloon head appears and starts to behave as a balloon (`moveDownFloating = ((arc4random() % 2)==0) ? moveLeftDown : moveRightDown`).
* The balloon either pops (`let popSound = SKAction.playSoundFileNamed("pop", waitForCompletion: false)`) or fades after a second (`fadeOut = SKAction.fadeOut(withDuration: 1.0)`).
* An ARAnchor uses a 4×4 matrix that represents the combined position, rotation or orientation, and scale of an object in three-dimensional space (as in `var translation = matrix_identity_float4x4`).


### `ViewController.swift`

This view is managed by the class ViewController, which inherits from `ARSKViewDelegate` so that we can create a `sceneView` variable. This class has methods for:

* Views
 - Scaling and placing the view.
 - View when it loads (and load the pre-defined scene from [SKScene](https://developer.apple.com/documentation/spritekit/skscene)).
 - View to appear and disappear.
 - Run.

* Sessions
 - Session interrupted.
 - Session ended.



### `AppDelegate.swift`

This is where we call the class `AppDelegate`, which responds for `UIApplicationMain`. In this class, we create a variable that will work as the window UI, and we have UI methods for:

* See if the application is about to move from active to inactive state (for example, pause ongoing tasks).
* Release shared resources and save user data.
* Change from the background to the active state.
* Restart any tasks that were paused while the application was inactive.
* Termination actions for when the application is about to terminate (for example, to save data if appropriate).


### Some Terminology

* **Field of view**: measured in degrees, is the extent of the observable world that is seen at any given moment (humans have a FOV of around 180°, but most HMDs offer between 50 and 110°).

* **Latency**: In VR, a 20-millisecond latency is considered low and acceptable for a comfortable experience.

* **Haptics**: recreate the sense of touch by applying forces, vibrations, or motions to the user, through feedback devices (example, vibrating game controllers).

* **Stitching**: the process of combining multiple video sources with overlapping fields of view to produce a fully immersive 360°. 

* **Visual Inertial Odometry**: ARKit analyzes the phone camera and motion data in order to keep track of the world around the
ARSession object that manages the motion tracking and image processing.


