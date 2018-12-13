class Life {
  constructor(iterator, size) {
    this.iterator = iterator;
    this.size = size;
    this.data = [];
  }

  nextGen = currentGen => {
    const newGen = this.inializeGen();
    const length = currentGen.length;
    for (let x = 0, l = currentGen.length; x < l; x++) {
      for (let y = 0, l = currentGen[x].length; y < l; y++) {
        let sum = 0;
        for (let r = -1, l = 1; r <= l; r++) {
          for (let c = -1, l = 1; c <= l; c++) {
            let dx = (x + r) % length;
            let dy = (y + c) % length;
            if (dx < 0 || dy < 0) continue;
            let cell = currentGen[dx][dy];

            if (cell !== currentGen[x][y] && cell.alive) {
              sum++;
            }
          }
        }

        if (sum === 3 && !currentGen[x][y].alive) {
          newGen[x][y].toggleState();
        } else if (sum > 2 && sum < 4 && currentGen[x][y].alive) {
          newGen[x][y].toggleState();
        } else if (
          (sum === 2 && currentGen[x][y].alive) ||
          (sum === 3 && currentGen[x][y].alive)
        ) {
          newGen[x][y].toggleState();
        }
      }
    }
    return newGen;
  };
  inializeGen = () => {
    const size = Math.floor(this.size / this.iterator);
    this.data = new Array(size).fill(0).map(x => new Array(size).fill(0));

    for (let x = 0, l = size; x < l; x++) {
      for (let y = 0; y < l; y++) {
        this.data[x][y] = new Cell();
      }
    }
    return this.data;
  };
  clearGrid = () => {
    const size = Math.floor(this.size / this.iterator);
    this.data = new Array(size).fill(0).map(x => new Array(size).fill(0));
    for (let x = 0, l = size; x < l; x++) {
      for (let y = 0; y < l; y++) {
        this.data[x][y] = new Cell();
      }
    }
    return this.data;
  };
  randomizeGrid = () => {
    const size = Math.floor(this.size / this.iterator);
    this.clearGrid();
    for (let x = 0, l = size; x < l; x++) {
      for (let y = 0; y < l; y++) {
        const alive = Math.round(Math.random());
        if (alive) {
          this.data[x][y].toggleState();
          continue;
        }
      }
    }
    return this.data;
  };
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
