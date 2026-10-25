import SvgIcon from '@mui/material/SvgIcon';

export const CheckIcon = (props) => {
  const { ...rest } = props;
  return (
    <SvgIcon
      {...rest}
      fontSize="inherit"
      color="inherit"
      viewBox="0 0 25 19"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.169 0.671396C21.1026 -0.223744 22.5759 -0.223742 23.5095 0.671398C24.5003 1.62138 24.5003 3.20533 23.5095 4.15531L8.7887 18.2699L0.742942 10.5551C-0.247793 9.60514 -0.247773 8.02123 0.742986 7.07127C1.67659 6.17611 3.14992 6.17614 4.08349 7.07133L8.7887 11.5831L20.169 0.671396Z"
      />
    </SvgIcon>
  );
};
