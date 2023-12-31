const sendToken = (user, statusCode, res) => {
  const token = user.getToken();
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    sameSite: "None",
    secure: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
export { sendToken };
