# 2048-with-AI

<h2>Tooling:</h2>
<p>This app was built with React and TypeScript, and browserify was used to bundle the compiled JavaScript</p>

<h2>AI</h2>
<p>When testing, the AI is averaging at a score of around 70000, reaching the 8192 tile most of the time</p>
<p>The algorithm used is expectimax, which is a variant of minimax designed for complete information games where instead of a proper opponent (i.e a minimizer) we play against an agent that behaves randomly. This simulates the stage where the game places a random tile on the grid after every turn</p>

<h2>TODO</h2>
<p>The game needs screen controls so that mobile users can play rather than just watch the AI</p>
