import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '30px',
    paddingLeft: '5%',
    paddingRight: '5%',
    flexDirection: 'column',
    display: 'flex',
    borderRadius: '5px',
    backgroundColor: 'white',
    width: '85%',
    marginBottom: '30px',
    border: '1px solid #e3e3e3',
    boxShadow: '1px 1px 1px #dbdbdb',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '5%',
  },
  headerText: {
    marginRight: theme.spacing(10),
    marginLeft: '5%',
    marginTop: '30px',
    color: 'gray',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStyles;
