import React from 'react';
import './PropSettings.scss';
const PropSettings = (props:any)=>{
    return (
    <article>
        <div className="settings-container">
        {
            Object.keys(props).map((val,i)=>
                <div className="tr" key={i+'settings'}> 
                    <div className="td width-60" >{val}</div>
                    <div className="td mx-width-250">{JSON.stringify(props[val],null, 0)}</div>
                </div>
            )
        }
        </div>
    </article>
    );
};

export default PropSettings;