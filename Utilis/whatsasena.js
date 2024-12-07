const crypto = require('crypto');

class StringSession {
    constructor() {
        // Replace this key and iv with your own secure values
        this.key = crypto.createHash('sha256').update(String("whatsasena_key")).digest();
        this.iv = Buffer.alloc(16, 0); // Initialization vector (16 bytes)
    }

    // Encrypt the session data into a string
    createStringSession(authInfo) {
        try {
            const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
            let encrypted = cipher.update(JSON.stringify(authInfo), 'utf8', 'base64');
            encrypted += cipher.final('base64');
            return encrypted;
        } catch (error) {
            console.error(`Error creating string session: ${error.message}`);
            return null;
        }
    }

    // Decrypt the string session into original auth info
    deCrypt(string) {
        try {
            if (!string) {
                console.warn("Warning: No string provided to decrypt. Returning null.");
                return null;
            }
            
            const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
            let decrypted = decipher.update(string, 'base64', 'utf8');
            decrypted += decipher.final('utf8');
            
            return JSON.parse(decrypted);
        } catch (error) {
            console.error(`Error decrypting string session: ${error.message}`);
            return null;
        }
    }
}

module.exports = { StringSession };
