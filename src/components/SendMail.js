import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

const SendMail = ({ name, email, comment, image, address }) => {
    const [isSending, setIsSending] = useState(false);

    const handleSendMail = async () => {
        try {
            if (!name || !email || !comment || !address) {
                // At least one required field is missing
                alert('Please fill out all fields before sending the email.');
                return;
            }

            setIsSending(true);
            const mailOptions = {
                recipients: ['test@test.com'],
                subject: 'Alert Screen Information',
                body: `
                    <p>Name: ${name}</p><br>
                    <p>Email: ${email}</p><br>
                    <p>Address: ${address}</p><br>
                    <p>Comment: ${comment}</p><br>
                `,
                attachments: image ? [ image ] : [],
                isHtml: true,
            };

            await MailComposer.composeAsync(mailOptions);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <View>
            <Button title="Send email" onPress={handleSendMail} disabled={isSending} />
            {isSending && <Text>Sending email...</Text>}
        </View>
    );
};

export default SendMail;
