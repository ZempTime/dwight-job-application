import chalk from 'chalk';

function slimChalk(color, str) {
  return chalk[color](str);
}

export default slimChalk;