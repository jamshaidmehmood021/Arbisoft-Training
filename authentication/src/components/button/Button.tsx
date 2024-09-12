import React, { memo, ReactNode } from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: theme.shape.borderRadius * 2,
    fontWeight: 'bold',
    padding: theme.spacing(1.5),
  },
}));

interface ButtonProps extends MuiButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = memo(({ 
  variant = 'contained', 
  color = 'primary', 
  size = 'medium', 
  onClick, 
  children, 
  ...props 
}) => {
  const classes = useStyles();
  
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      className={classes.button}
      onClick={onClick}
      {...props}
    >
      {children}
    </MuiButton>
  );
});

export default Button;
