function checkPassword(password) {
  if (password.length < 6) {
    return 'Password is so small';
  }
  if (password.length > 15) {
    return 'Password is so big';
  }
  return 'OK';
}


module.exports.checkPassword = checkPassword;
