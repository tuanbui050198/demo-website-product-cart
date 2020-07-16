const styles = (theme) => ({
  drawerPaper: {
    width: '240px',
    zIndex: 25,
    maxWidth: '240px',
    height: '100%',
    position: 'relative',
    backgroundColor: '#996600',
    minHeight: '100vh',
  },
  
  menuLink: {
    
    color: '#fff',
    '&:hover': {
      color: 'red',
    }, 
    '&>div':{
      '&:hover': {
        backgroundColor: '#000',
      }
    }
  },
  menuLinkActive: {
    '&>div': {
      backgroundColor: '#000',
    }
  }
});

export default styles;
