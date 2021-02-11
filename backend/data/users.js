import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin user",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 12),
        isAdmin: true,
    },
    {
        name: "Anton Zhuravlev",
        email: "anton@example.com",
        password: bcrypt.hashSync("123456", 12),
    },
    {
        name: "Paravattikuss Mendepopopuluus",
        email: "parav@example.com",
        password: bcrypt.hashSync("123456", 12),
    },
];

export default users;
