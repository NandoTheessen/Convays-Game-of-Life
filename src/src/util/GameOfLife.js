class Life {
  constructor(generation, iterator, width) {
    this.generation = generation;
    this.iterator = iterator;
    this.data = [];
    this.width = width;
  }

  generateBuffer = () => {};
  inializeGen = () => {
    this.data = new Array(20).fill(0).map(x => new Array(20).fill(0));

    for (let i = 0, l = this.data.length; i < l; i++) {
      for (let j = 0; j < l; j++) {
        this.data[i][j] = new Cell();
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
