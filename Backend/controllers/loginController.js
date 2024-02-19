const bcrypt = require('bcryptjs');
const { validateLoginUser, User } = require('../models/User');
const jwt = require('jsonwebtoken');

/**----------------------------------------------------
 * @description login  user <===> Sign in.
 * @router /api/auth/login
 * @method POST
 * @access public
 ------------------------------------------------------*/

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1-Validation
    const error = validateLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // 2. Existence de l'utilisateur
    let user = await User.findOne({ email }); 
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // 3. Vérification du mot de passe
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    //@TODO Sending email to verify

    // 4. Génération du token JWT
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY);

    // 5. Réponse au client
    return res.status(200).json({
      _id: user._id,
      isAdmin: user.isAdmin,
      profilePhoto: user.profilePhoto,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { loginUserController };