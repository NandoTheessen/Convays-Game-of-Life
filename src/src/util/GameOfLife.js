class Life {
  constructor(generation, iterator, width) {
    this.generation = generation;
    this.iterator = iterator;
    this.data = [];
    this.width = width;
  }

  nextGen = currentGen => {
    const newGen = this.inializeGen();
    this.generation++;
    for (let x = 0, l = currentGen.length; x < l; x++) {
      for (let y = 0, l = currentGen[x].length; y < l; y++) {
        let sum = 0;
        for (let r = -1, l = 1; r <= l; r++) {
          for (let c = -1, l = 1; c <= l; c++) {
            let dx = (x + r) % 20;
            let dy = (y + c) % 20;
            if (dx < 0 || dy < 0) continue;
            let cell = currentGen[dx][dy];

            if (cell !== currentGen[x][y] && cell.alive) {
              sum++;
            }
          }
        }
        if (currentGen)
          if (sum === 3 && !currentGen[x][y].alive) {
            console.log(x, y, sum);
            newGen[x][y].toggleState();
          } else if (sum > 2 && sum < 4 && currentGen[x][y].alive) {
            console.log(x, y, sum);
            newGen[x][y].toggleState();
          } else if (
            (sum === 2 && currentGen[x][y].alive) ||
            (sum === 3 && currentGen[x][y].alive)
          ) {
            console.log(x, y, sum);
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
