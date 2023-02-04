interface UserAccount {
    userID: string;
    createdAt: number;
    username: string;

    email: {
        value: string;
        verified: boolean;
        verifiedAt: Number
    };

    preferences: {
        locale: "en" | "es";
        theme: "dark" | "light"
    },

    password: string;
    banned: boolean;
}

export type { UserAccount }