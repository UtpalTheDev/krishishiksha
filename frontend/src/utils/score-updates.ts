import { question, option } from "../Data/quiz.types";

function update(score: number, qsn: question, opt: option) {
  return opt.isRight ? score + qsn.points : score;
}
