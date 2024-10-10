import { EmailTemplateProps } from '@/lib/definitions/frontEndDefinitions';
import * as React from 'react';

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
