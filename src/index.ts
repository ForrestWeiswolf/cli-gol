import readline from 'readline';
import { create2dArray, randomBool } from './utils';
import Grid from './grid';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter grid size\n', (sizeAnswer: string) => {
  if (!Number.isNaN((parseInt(sizeAnswer, 10)))) {
    const showGrid = (grid: Grid) => {
      console.log(grid.toString());
      const prompt = 'Enter number of steps to advance, N to quit, or press enter to advance 1 step\n';
      rl.question(prompt, (answer: string) => {
        console.log(answer);
        if (answer.toLowerCase() === 'n') {
          rl.close();
        } else if (answer === '') {
          showGrid(grid.advance(1));
        } else if (!Number.isNaN((parseInt(answer, 10)))) {
          const stepsToAdvance = parseInt(answer, 10);
          showGrid(grid.advance(stepsToAdvance));
        } else {
          showGrid(grid);
          console.log('Could not parse answer\n');
        }
      });
    };

    const size = parseInt(sizeAnswer, 10);

    const initial = create2dArray(size, size, randomBool);
    // initial[1][1] = true
    // initial[1][2] = true
    // initial[1][3] = true

    showGrid(new Grid(size, initial));
  } else {
    console.log('Could not parse answer\n');
  }
});
