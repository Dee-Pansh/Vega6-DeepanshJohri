const User = require("../Models/User");
const { uploadMediaToCloudinary } = require("../Utils/uploadMediaToCloudinary");

const loginController = async (req, res) => {
  console.log("login controller end point hits...");
  try {
    const { email, password } = req.body;

    const UserAlreadyExists = await User.findOne({ email });

    if (!UserAlreadyExists) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const isPasswordValid = await UserAlreadyExists.VerifyPassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const token = await UserAlreadyExists.generateToken(UserAlreadyExists._id);

    res.cookie("token", token, { expires: new Date(Date.now() + 900000) });

    res.status(200).json({
      success: true,
      message: "User loggedIn successfully!!"
    });


  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
};

const signUpController = async (req, res) => {
  console.log("signUp controller end point hits...")
  try {

    const body = req.body;

    const { email, password } = body;

    const UserAlreadyExists = await User.findOne({ email });

    if (UserAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      })
    };

    let imageUrl = "";

    if (req.file) {
      const { originalname, mimetype, buffer } = req.file;

      console.log(`File details : fileName ${originalname}, fileType :  ${mimetype} `);

      console.log("Uploading to cloudinary starting...");

      const imageResult = await uploadMediaToCloudinary(buffer);

      const { public_id, secure_url } = imageResult;

      console.log(`File uploaded successfully to cloudinary, Public Id : ${public_id}`)

      imageUrl = secure_url;

    }

    const user = new User({ email, password, imageUrl });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      userDetails: {
        email,
        imageUrl
      }
    })


  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong"
    })
  }
};


module.exports = { loginController, signUpController };