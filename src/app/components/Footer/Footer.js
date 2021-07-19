import { Typography } from '@material-ui/core';

export default function Footer() {
  return (
    <footer
      position="static"
      style={{
        marginTop: '70px',
        padding: '10px 0px',
        backgroundColor: '#fffff',
        WebkitBoxShadow: ' 0 -3px 7px -7px black',
        MozBoxShadow: ' 0 -3px 7px -7px black',
        boxShadow: ' 0 -3px 7px -7px black',
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        STUDY FILES
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        @StudyFiles WebNC 2021
      </Typography>
    </footer>
  );
}
