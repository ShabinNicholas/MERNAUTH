const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = require("../schema/userSchema");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const signUp = async (req, res) => {
    try {
        const { userName, userEmailId, userPassword } = req.body;
        const existingUser = await userSchema.findOne({ userEmailId })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            })
        }
        const hashedPassword = await bcrypt.hash(userPassword, 10)
        const newUser = new userSchema({
            userName,
            userEmailId,
            userPassword: hashedPassword,
        })
        await newUser.save()
        res.json({
            message: "User registered successfully"
        })
    } catch (error) {
        res.status(500).json({ message: "Signup error", err: error.message, stack: error.stack })
    }
}

const signIn = async (req, res) => {
    try {
        const { userEmailId, userPassword } = req.body;

        const user = await userSchema.findOne({ userEmailId })

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        const isMatch = await bcrypt.compare(userPassword, user.userPassword)

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        user.refreshToken = refreshToken
        await user.save()

        res.json({
            message: "Login successful",
            accessToken,
            refreshToken
        })
    } catch (error) {
        res.status(500).json({ message: "Login error", err: error.message, stack: error.stack })
    }
}

const refreshToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({
            message: "Refresh token required",
        })
    }

    const user = await userSchema.findOne({ refreshToken: token })

    if (!user) {
        return res.status(403).json({
            message: "Invalid refresh token",
        })
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
        if (err) {
            return res.status(403).json({
                message: "Token expired"
            })
        }

        const newAccessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        )

        res.json({ accessToken: newAccessToken })
    })


}

const logout = async (req, res) => {
    try {
        const { token } = req.body

        const user = await userSchema.findOne({ refreshToken: token })
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        user.refreshToken = null;
        await user.save()
        res.json({
            message: "Logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Logout error",
            error: error.message
        })
    }
}

module.exports = {
    signIn,
    signUp,
    refreshToken,
    logout
}