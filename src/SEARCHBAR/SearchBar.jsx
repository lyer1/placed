import React from 'react';
import "./searchbarstyles.css";

import { Component } from 'react'

// function onChange(e){       
// }

export class SearchBar extends Component {
    constructor(props){
        super(props);
        this.searchText = "";
    }
    onChange = (e) => {
        this.searchText = e.target.value;
        this.props.onSearchChange(e.target.value);
    }
    getSearchText = () => this.searchText;
    render() {
        return (
            <>
            <div className="search-container">  
            <input className="search-input" placeholder="Search" onChange={this.onChange}></input>
            <button mat-icon-button className="search-container-button">
                search
            </button>
            </div>
            </>)
    }
}

export default SearchBar
    
// export default function SearchBar() {
  
//     function onChange(e){
//         console.log(e.target.value);
//     }

//     return (
//     <>
//     <div className="search-container">  
//       <input className="search-input" placeholder="Search" onChange={onChange}></input>
//       <button mat-icon-button className="search-container-button">
//         <mat-icon>search</mat-icon>
//       </button>
//     </div>
//     </>)
// }
