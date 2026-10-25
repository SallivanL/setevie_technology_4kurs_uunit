import image from './main-icon.svg';

export const MainIcon = ({ width = 56, height = 56, alt = '', style, className }) => {
  return <img src={image} alt={alt} width={width} height={height} style={style} className={className} />;
};
