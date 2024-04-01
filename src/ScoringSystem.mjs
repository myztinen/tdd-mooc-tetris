export class ScoringSystem {

  level;
  score;

  constructor(level) {
      this.level = level;
      this.score = 0;
    }
    
  update(removedLines) {
    if(removedLines == 1) {
      this.score += 40 * (this.level + 1)
    } else if(removedLines == 2) {
      this.score += 100 * (this.level + 1)
    } else if(removedLines == 3) {
      this.score += 300 * (this.level + 1)
    } else if (removedLines == 4) {
      this.score += 1200 * (this.level + 1)

    }
  }

  getScore(){
    return this.score;
  }
}