import React from 'react';
import './Tag.css';

export default function Tag({ name, tag }) {
  return <span className={`Tag Tag-${tag}`}>{name}</span>;
}
