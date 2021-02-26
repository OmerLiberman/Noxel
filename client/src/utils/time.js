const numberToDay = (num) => {
  switch (num) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    default:
      return 'Sun';
  }
};

const numberToDayHeb = (num) => {
  switch (num) {
    case 0:
      return 'ראשון';
    case 1:
      return 'שני';
    case 2:
      return 'שלישי';
    case 3:
      return 'רביעי';
    case 4:
      return 'חמישי';
    default:
      return 'ראשון';
  }
};

exports.numberToDay = numberToDay;
exports.numberToDayHeb = numberToDayHeb;