import React from 'react';
//import { Button } from 'antd';

import { Carousel } from 'antd';

const items = [
  {
    key: '1',
    title: 'Building Back Better',
    content: "Welcome to Baseline patient portal. We hope to help you and your patients maintain consistent and productive contact using our services",
  },
 
]

function AppHero() {
  return (
    <div id="hero" className="heroBlock">
      <Carousel>
        {items.map(item => {
          return (
            <div key={item.key} className="container-fluid">
              <div className="content">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                
              </div>
            </div>  
          );
        })}
      </Carousel>
    </div>
  );
}

export default AppHero;