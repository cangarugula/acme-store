import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({path})=> {
  const selected = (_path)=> {
    const style = {};
    if(_path === path){
      style.fontWeight = 'bold';
    }
    return style
  };

  return (
    <ul>
      <li style={selected('/')}><Link to='/'>Home</Link></li>
      <li style={ selected('/cart')}><Link to='/cart'>Cart ()</Link></li>
      <li style={ selected('/orders')}><Link to='/orders'>Orders ()</Link></li>
    </ul>
  );
};


export default Nav;
