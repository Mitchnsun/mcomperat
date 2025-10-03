'use client';

import React from 'react';

import { TagProps } from '../../types';

const BACKGROUND_COLOR: Record<string, string> = {
  html: '#5aba59',
  css: '#4d85d1',
  js: '#e59539',
  back: '#282828',
  ios: '#8156a7',
  db: '#6faedb',
};

const Tag: React.FC<TagProps> = ({ name, tag }) => (
  <>
    <span>{name}</span>
    <style jsx>
      {`
        span {
          display: inline-block;
          margin: 0.5em 1em 0.1em 0.1em;
          padding: 0.3em 1em;
          color: #fff;
          font-size: 80%;
          background: ${
            // eslint-disable-next-line security/detect-object-injection
            BACKGROUND_COLOR[tag] || '#919191'
          };
        }
      `}
    </style>
  </>
);

export default Tag;
