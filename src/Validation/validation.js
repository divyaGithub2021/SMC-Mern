const yup = require("yup");

const userSchema = yup.object({
    firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().required(),
  email: yup.string().required()
})

module.exports = userSchema