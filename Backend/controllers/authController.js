const bcrypt = require('bcryptjs')
const {validateRegisterUser,User} = require('../models/User')

/**----------------------------------------------------
 * @description Register new user <===> Sign Up.
 * @router /api/auth/register
 * @method POST
 * @access public
 ------------------------------------------------------*/

 const registerUserController = async (req, res) => {
    try {
      // Utilisez directement req.body, pas besoin de l'attendre
      const { username, email, password } = req.body;
  
      // Validation
      const error = validateRegisterUser(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
  
      // Vérifiez si l'utilisateur existe déjà
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists!' });
      }
  
      // Hachez le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Créez un nouvel utilisateur et enregistrez-le en base de données
      user = new User({ username, email, password: hashedPassword });
      await user.save();
  
      // Envoyez la réponse au client
      res.status(201).json({ message: 'Registration successful. Please login.', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    registerUserController,
  }