import { create2dArray, randomBool } from "./utils";
import Grid from './grid'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter grid size\n", function (answer: string) {
  if (!Number.isNaN((parseInt(answer, 10)))) {
    const showGrid = () => {
      console.log(grid.toString());
      const prompt = "Enter number of steps to advance, N to quit, or press enter to advance 1 step\n"
      rl.question(prompt, function (answer: string) {
        console.log(answer)
        if (answer.toLowerCase() === 'n') {
          rl.close();
        } else if (answer === '') {
          grid = grid.advance(1)
          showGrid()
        } else if (!Number.isNaN((parseInt(answer, 10)))) {
          const stepsToAdvance = parseInt(answer)
          grid = grid.advance(stepsToAdvance)
          showGrid()
        } else {
          showGrid()
          console.log('Could not parse answer\n')
        }
      });
    }

    const size = parseInt(answer, 10);

    const initial = create2dArray(size, size, randomBool)
    // initial[1][1] = true
    // initial[1][2] = true
    // initial[1][3] = true

    let grid = new Grid(size, initial)

    showGrid()
  } else {
    console.log('Could not parse answer\n')
  }

})
