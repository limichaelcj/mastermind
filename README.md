# Mastermind

The [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)) board game built for the web.

### Installation

No installation needed! You can find the game on the web at [limichaelcj.github.io/mastermind](https://limichaelcj.github.io/mastermind) in your web browser.

You may choose to install the game as a web application for a better experience. Go to your browser settings and select _Add to Home screen_.

### Gameplay

The computer will generate a secret sequence of glyphs. It's your job to find out what the sequence is by submitting your own sequences that you make from a limited set of glyphs.

Once you submit a sequence, you will be given feedback describing how your sequence compares to the computer's sequence.

 - Each red mark indicates a perfect match with one glyph somewhere in your sequence.
 - Each white mark indicates a correct glyph in your sequence that is in the incorrect position.

**_Note:_** There may be duplicate glyphs in your set. Each mark will only account for one instance of the glyph's value e.g. if the secret sequence is [1,1,2,2] and you submit [1,2,1,1], you will receive 1 red mark and 2 white marks.

Mastermind can be played on mobile or desktop.

| Controls | Mobile     | Desktop     |
|----------|------------|-------------|
| Select   | Tap        | Left Click  |
| Remove   | Long Press | Right Click |

### Customization

Make sure to check out the game options menu denoted by the cog ⚙️ icon. You can customize the appearance of the game as well as your hand orientation for easier one-handed play.

## Methodology

This web application was developed using the Gatsby.js static website generator with React and Redux. True random numbers were generated using the [random.org](https://www.random.org/clients/http/api/) API.

#### Generating random sequences

For each secret sequence generated in the game, a series of eight random integers from 0-7 were requested from the random.org API. To both preserve the true randomness of the sequence and minimize API calls, the first four integers received from the request will become the next secret sequence for the player to guess against. The entire list of eight integers is then scrambled on the client side to be rendered for the player. Since the randomness of the render is less important than the sequence, producing randomness with JavaScript's built-in random function is good enough.

#### Validating user submissions

The secret and player sequences are stored in the game state as 4-index arrays of integer values. Once the player submits their sequence, the two sequences are compared for exact matches and close matches.

For exact matches, an iterator checks for exact equality for both sequences' corresponding indices. When there is a match, both arrays are spliced at that index position and a counter is incremented for exact matches.

```javascript
var secret = [1,3,3,4]
var player = [5,3,1,1]

compareExact(secret, player)
// match at index 2 -> splice both arrays at 0

// secret = [1,3,4]
// player = [5,1,1]
// exactMatches = 1

```

For close matches, where a correct integer value was provided, but was not in the correct position in sequence, the secret sequence is iterated. At each index, the user's sequence is searched for the first instance of the same value. If there is a match, the secret sequence is spliced at the current iteration index, and the user sequence is spliced at the matched index with the same value.

```javascript
secret = [1,3,4]
player = [5,1,1]

compareClose(secret, player)
// match at secret[0] and player[2] -> splice

// secret = [2,4]
// player = [5,3]
// closeMatches = 1
```
This method of splicing ensures that no duplicates are counted when comparing the sequences. In the example, even though the player submitted an extra 1 value, it does not get counted toward the number of close matches.

