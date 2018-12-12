class Life {
  constructor(generation, iterator, width) {
    this.generation = generation;
    this.iterator = iterator;
    this.data = [];
    this.width = width;
  }

  nextGen = currentGen => {
    this.generation++;
    const newGen = currentGen.slice(0);
    for (let x = 0, l = currentGen.length; x < l; x++) {
      for (let y = 0, l = currentGen[x].length; y < l; y++) {
        let sum = 0;
        if (x !== 19 && y !== 19 && y !== 0 && x !== 0) {
          //   console.log('X: ', x, 'Y: ', y);
          for (let r = -1, l = 1; r <= l; r++) {
            for (let c = -1, l = 1; c <= l; c++) {
              if (newGen[x + r][y + c].alive) sum += 1;
              //   console.log('X :', x + r, 'Y :', y + r, 'sum: ', sum);
            }
          }
          if (newGen[x][y].alive) sum--;
          //   console.log('X :', x, 'Y :', y, 'sum; ', sum);
        } else if (x === 19) {
          //   console.log('X===19');
        } else if (y === 19) {
          //   console.log('Y===19');
        }

        if ((sum > 3 || sum < 2) && newGen[x][y].alive) {
          newGen[x][y].toggleState();
        } else if (sum === 3 && !newGen[x][y].alive) {
          newGen[x][y].toggleState();
        }
      }
    }
    return newGen;
  };
  inializeGen = () => {
    this.data = new Array(20).fill(0).map(x => new Array(20).fill(0));

    for (let x = 0, l = this.data.length; x < l; x++) {
      for (let y = 0; y < l; y++) {
        this.data[x][y] = new Cell();
      }
    }
    return this.data;
  };
  clearGrid = () => {
    this.data = new Array(20).fill(0).map(x => new Array(20).fill(0));
    for (let x = 0, l = this.data.length; x < l; x++) {
      for (let y = 0; y < l; y++) {
        this.data[x][y] = new Cell();
      }
    }
    return this.data;
  };
  generateGeneration = () => {};
}

class Cell {
  constructor() {
    this.alive = false;
  }
  toggleState = () => {
    this.alive = !this.alive;
  };
}

export default Life;
