function isValidText(value) {
  return value && value.trim().length > 0;
}

function isValidEmail(value) {
  return value && value.includes("@");
}

exports.isValidText = isValidText;
exports.isValidEmail = isValidEmail;
