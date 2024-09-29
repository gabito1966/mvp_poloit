// src/utils/renderTemplate.ts

import ReactDOMServer from 'react-dom/server';
import { ReactNode } from 'react';

export const renderTemplate = (template: ReactNode): string => {
  return ReactDOMServer.renderToStaticMarkup(template);
};
