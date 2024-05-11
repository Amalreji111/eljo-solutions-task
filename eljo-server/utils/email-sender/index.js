const { Env, EnvKeys } = require('../../env')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(Env.get(EnvKeys.SENDGRID_API_KEY));
class EmailSender {
    constructor() {
      /**
       * @typedef {Object} EmailData
       * @property {string[]} to - Recipients' email addresses.
       * @property {string} from - Sender's email address.
       * @property {string} subject - Email subject.
       * @property {string} text - Text content of the email.
       * @property {string[]} attachments - attachements  of the email,this should be base 64 string.
       * @property {string} html - HTML content of the email.
       */
  
      /** @type {EmailData} */
      this.emailData = {
        to: [],
        from: {
          name: "Eljo Notification",
          email: Env.get(EnvKeys.SENDGRID_SENDER),
        },
        subject: "",
        attachments: [],
        text: "",
        html: "",
      };
    }
  
    /**
     * Add a recipient's email address to the email.
     * @param {string} email - Recipient's email address.
     * @returns {EmailSender} The EmailSender instance.
     */
    addTo(email) {
      this.emailData.to.push(email);
      return this;
    }
  
    /**
     * Set recipient's email addresses for the email.
     * @param {string[]} emails - Recipients' email addresses.
     * @returns {EmailSender} The EmailSender instance.
     */
    setTo(emails) {
      this.emailData.to = emails;
      return this;
    }
  
    /**
     * Set the sender's email address.
     * @param {string} email - Sender's email address.
     * @returns {EmailSender} The EmailSender instance.
     */
    setFrom(email) {
      this.emailData.from.email = email;
      return this;
    }
  
    /**
     * Set the subject of the email.
     * @param {string} subject - Email subject.
     * @returns {EmailSender} The EmailSender instance.
     */
    setSubject(subject) {
      this.emailData.subject = subject;
      return this;
    }
  
    /**
     * Set the text content of the email.
     * @param {string} text - Text content of the email.
     * @returns {EmailSender} The EmailSender instance.
     */
    setTextContent(text) {
      this.emailData.text = text;
      return this;
    }
  
    /**
     * Set the HTML content of the email.
     * @param {string} html - HTML content of the email.
     * @returns {EmailSender} The EmailSender instance.
     */
    setHTMLContent(html) {
      this.emailData.html = html;
      return this;
    }
    /**
     * Set the Attachments of the email.
     * @param {string[]} attachements - Attachments of the email.
     * @returns {EmailSender} The EmailSender instance.
     */
    setAttachments(attachements) {
      this.emailData.attachments = attachements;
      return this;
    }
  
    /**
     * Add the Attachment to the email.
     * @param {string} attachement - Attachment of the email,should be base 64 string.
     * @returns {EmailSender} The EmailSender instance.
     */
    addAttachment(attachement) {
      this.emailData.attachments.push(attachement);
      return this;
    }
  
    /**
     * Send the email using SendGrid.
     * @returns {Promise<any>} A Promise that resolves when the email is sent successfully.
     */
    async send() {
      try {
        const response = await sgMail.send(this.emailData);
        return response;
      } catch (error) {
        console.log(error);
        console.error("Error sending email:", error.response.body);
        return false;
      }
    }
  }

  module.exports = {EmailSender}