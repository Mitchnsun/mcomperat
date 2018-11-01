import React from 'react';
import './Tag.css';

export default function Tag(props){
  return <span className={`Tag Tag-${props.tag}`}>{props.name}</span>
}