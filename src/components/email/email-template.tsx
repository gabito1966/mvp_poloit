import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  content: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  content,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>{content}</p>
    <p>Saludos,<br />Equipo Polo IT</p>
  </div>
);
