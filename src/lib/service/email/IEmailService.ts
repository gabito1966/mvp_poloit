export interface EmailOptions {
    from: string;
    to: string[];
    subject: string;
    template: React.ReactNode; // Puedes ajustar esto según cómo manejas las plantillas
  }
  
  export interface IEmailService {
    sendEmail(options: EmailOptions): Promise<{ data: any; error: any }>;
    getEmail(emailId: string): Promise<{ data: any; error: any }>;
    deleteEmail(emailId: string): Promise<{ data: any; error: any }>;
  }