import axios from 'axios';

interface WhatsAppMessage {
  to: string;
  template: string;
  language: { code: string };
  components: {
    type: string;
    parameters: { type: string; text: string }[];
  }[];
}

export async function sendWhatsApp(
  user: { desk360ApiKey: string; desk360AccountId: string },
  message: WhatsAppMessage
) {
  const config = {
    headers: {
      Authorization: `Bearer ${user.desk360ApiKey}`,
      'Account-ID': user.desk360AccountId,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post(
      'https://api.desk360.com/v1/messages',
      message,
      config
    );
    return response.data;
  } catch (error: any) {
    console.error('Desk360 API Error:', error.response?.data || error.message);
    throw new Error('Failed to send WhatsApp message');
  }
}
