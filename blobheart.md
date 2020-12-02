# BlobHeart
2D demoscene project!

## Storyboard
Some ideas on potential scenes, each of which could evolve over time, and then transition to another scene.

### Abstract 2D Patterns
- Tiling hexagons
- Would be good for the intro, outro, and riff of a song

### Dancing Blob Emojis
- Similar to [Crab Rave](https://www.youtube.com/watch?v=LDU_Txk06tM), where it focuses on one Blob at first, and then has several scenes where the number of Blobs dancing together increases
- Would be good for the build and chorus of a song

### Fireflies
- Glowing particles
- Flocking behavior, boids style
- Set "resting position" of particles through AE personality embeddings and PCA
- Would be good for the bridge or instrumental breakdown of a song

### Iconic Scenes
- Silhouette versions of iconic characters and scenes from anime: Miyazaki films, Your Name, 5cm/Second, Your Lie in April
- Would be good for the bridge or instrumental breakdown of a song. Have a largely static scene with a few animated elements

### Vague Ideas
- Something that captures what it's like to be in love --> how you feel stargazing while laying beside your partner.
- Rapidly play through games of Go (accelerating, could be used as a buildup thing). Would have to create a basic SGF reader

## Music
- Rocketman by AL-X
- Cosmic Love by Florence + The Machines
- More Than Survive from Be More Chill (the first half)
- Pox by Good Kid

### Possible
- Tadow by FKJ
- Ivy by Frank Ocean
- Lost by Frank Ocean
- The Feeling is All Gone by Solar Sun

## Inspiration
### Demoscene
### Shaders

## Technical
### p5js vs Shadertoy
TL;DR We should go with p5js

Most of the reasons to use Shadertoy are from a "technical purity standpoint", the medium imposes limitations that come along with having to do everything in a fragment shader, which makes things harder but also more technically impressive.

On the other hand, it seems like it's easier to go from intention to action with p5js, and that the learning curve isn't as steep.

Also, p5js is a superset of Shadertoy, since you can load GLSL shaders into p5js with [loadShader()](https://p5js.org/reference/#/p5/loadShader) and some [boilerplate](https://github.com/n1ckfg/PShaderToy/blob/e7faeb0b267a65e8fa777d566e60aef9771449b3/p5jsShaderToy/js/main.js)

### Real-time Collaboration
[p5Live](https://teddavis.org/p5live/) or VS Code Teletype with [one](https://marketplace.visualstudio.com/items?itemName=samplavigne.p5-vscode) of [these](https://marketplace.visualstudio.com/items?itemName=andreapollini.p5-live-editor&ssr=false) p5js extensions
