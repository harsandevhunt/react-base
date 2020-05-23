import React from 'react';
import { Link } from '@reach/router';

export default (props:any) =>{
    return (
        <Link 
            {...props}
            getProps={({ isCurrent }) => {
                return {
                  className: isCurrent ? "active" : ""
                };
              }}
        />
    )
 }