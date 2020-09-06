const {
  body,
  validationResult,
  check
} = require('express-validator')

const userValidationRules = () => {
  return [
    check('email', 'Un email valide est requis').exists().isEmail(),
    check('pseudo', 'Un pseudo est requis'),
    check('password1', 'Un mot de passe est requis').exists().isLength({
      min: 8
    }),
    check('password2', 'La confirmation n\'est pas egale au mot de passe')
    .exists()
    .custom((value, {
      req
    }) => value === req.body.password1)
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({
    [err.param]: err.msg
  }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}