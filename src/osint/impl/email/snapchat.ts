import { Category } from "@osint/category";
import { Module } from "@osint/module";
import axios from "axios";

export class Snapchat extends Module {

    public static readonly meta = {
        name: "snapchat",
        category: Category.Email,
        description: "Searches for information about an email address using Snapchat."
    };

    constructor() { super(Snapchat.meta); }

    public async query(query: string): Promise<any> {
        try {
            const response = await axios.post('https://bitmoji.api.snapchat.com/api/user/find', 
                { 
                    email: query,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            const data = response.data;
            const accountCheck = '{"account_type": "bitmoji"}';

            return { 
                status: 200, 
                data: data && JSON.stringify(data).includes(accountCheck)
            };
        } catch (error) {
            console.error("Error querying Snapchat API:", error);
            if (error.response && error.response.status === 404) {
                return { status: 404, data: null, message: "This email is not registered to snapchat." };
            }
            return { status: 500, data: null };
        }
    }
}

module.exports = new Snapchat ;
