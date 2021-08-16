import { useEffect } from 'react';
import WebFont from 'webfontloader';

export default function CarouselCard({ title, content, background }) {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Vidaloka'],
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
          padding: '20px 40px',
          backgroundColor: '#fafafa',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          WebkitBoxShadow: '3px 3px 7px 3px rgba(82,82,82,0.24)',
          MozBoxShadow: '3px 3px 7px 3px rgba(82,82,82,0.24)',
          boxShadow: '3px 3px 7px 3px rgba(82,82,82,0.24)',
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
