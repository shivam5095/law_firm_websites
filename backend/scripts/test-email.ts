import '../src/config/loadEnv';
import { sendTestEmail } from '../src/services/email.service';

(async () => {
  const result = await sendTestEmail();
  if (result.success) {
    console.log('SUCCESS: test email sent. Check the NOTIFY_EMAIL inbox (and Spam).');
    process.exit(0);
  }
  console.log('FAILED:', result.reason);
  process.exit(1);
})();