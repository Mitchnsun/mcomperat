import React from 'react';
import './Tag.css';

export default function Tag(props){
  return <a href="#" className={`Tag Tag-${props.tag}`}>{props.name}</a>
}