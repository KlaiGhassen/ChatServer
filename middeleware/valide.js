const yup = require("yup");
async function validateChat(req, res, next) {
  const chatSchema = yup.object().shape({
    msg: yup
      .string()
      .required("Message is required")
      .min(1, "Message must be at least 1 character long")
  });

  try {
    await chatSchema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
}
module.exports = validateChat;