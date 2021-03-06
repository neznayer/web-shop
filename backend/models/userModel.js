import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        // hash password only if it is set from none to somethind
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// schema.methods - object with attached methods.
// in methods their properties can be used - as this.<property>. (this.password). but it must be declared as non-arrow function, to use context of parent inside
const User = mongoose.model("User", userSchema);

export default User;
