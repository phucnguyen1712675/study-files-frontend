import { useEffect } from 'react';
import WebFont from 'webfontloader';

export default function CarouselCard({ title, content, background }) {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Vidaloka', 'Montserrat'],
      },
    });
  }, []);

  const contentStyle = {
    height: '400px',
    padding: '35px 20px',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };
  return (
    <div style={contentStyle}>
      <div
        style={{
          width: '45%',
          height: '90%',
          marginLeft: '30px',
          padding: '20px',
          backgroundColor: '#fafafa',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          webkitBoxShadow: '0 7px 7px -7px black',
          mozBoxShadow: '0 7px 7px -7px black',
          boxShadow: '0 7px 7px -7px black',
        }}
      >
        <div
          style={{ fontFamily: 'Vidaloka', fontSize: 40, fontWeight: 'bold' }}
        >
          {title}
        </div>
        <div style={{ marginTop: '10px', fontSize: 22, fontWeight: 'lighter' }}>
          {content}
        </div>
      </div>
    </div>
  );
}
